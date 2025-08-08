"use client"

import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import NavigationCard from "@/components/NavigationCard";
import { Places } from "@/models/interfaces";
import ScrollContainer from "@/components/ScrollContainer";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';
import { LocationProvider } from '../contexts/LocationContext';
import type { RouteData as RouteDataType } from '../types/route';

// Define LocationPoint type locally for now
interface LocationPoint {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

// Dynamically import RouteMap to avoid SSR issues
const RouteMap = dynamic(() => import('../../components/Navigation/RouteMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <Loader className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

interface MergedHomeClientProps {
  places: Places[];
}

export default function MergedHomeClient({ places }: MergedHomeClientProps) {
  const [routeData, setRouteData] = useState<RouteDataType | null>(null);
  const [selectedFromLocation, setSelectedFromLocation] = useState<LocationPoint | null>(null);
  const [selectedToLocation, setSelectedToLocation] = useState<LocationPoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNavigationMode, setIsNavigationMode] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          resolve(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(new Error('Unable to retrieve your location'));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, []);

  const handleLocateClick = async (place: Places) => {
    try {
      setIsLoading(true);
      setError(null);
      setShowMap(true);

      // Get user's current location
      const currentLocation = await getCurrentLocation();
      
      // Set the from and to locations
      setSelectedFromLocation({
        name: 'Your Location',
        coordinates: [currentLocation.lng, currentLocation.lat]
      });
      
      setSelectedToLocation({
        name: place.name,
        coordinates: [place.long, place.lat]
      });

      // Calculate route
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const params = new URLSearchParams({
        start_lat: currentLocation.lat.toString(),
        start_lng: currentLocation.lng.toString(),
        end_lat: place.lat.toString(),
        end_lng: place.long.toString()
      });
      
      const fullUrl = `${baseUrl}/route?${params.toString()}`;
      console.log('Fetching route from:', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.success && data.route) {
        setRouteData(data.route);
      } else {
        throw new Error(data.error || 'Failed to calculate route');
      }
      
    } catch (err) {
      console.error('Error fetching route:', err);
      
      if (err instanceof TypeError && err.message.includes('string did not match the expected pattern')) {
        setError('Invalid URL format. Please check your network connection and try again.');
      } else if (err instanceof SyntaxError) {
        setError('Invalid response from server. Please try again.');
      } else if (err instanceof Error) {
        setError(err.message.includes('Failed to fetch') 
          ? 'Cannot connect to the server. Please ensure the backend is running.' 
          : err.message
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNavigation = () => {
    setIsNavigationMode(true);
  };

  const handleStopNavigation = () => {
    setIsNavigationMode(false);
  };

  const handleResetMap = () => {
    setRouteData(null);
    setSelectedFromLocation(null);
    setSelectedToLocation(null);
    setIsNavigationMode(false);
    setShowMap(false);
    setError(null);
  };

  return (
    <LocationProvider>
      <div className="h-screen w-full bg-white flex">
        {/* Always show ScrollContainer - takes 1/3 width */}
        <ScrollContainer 
          places={places} 
          onLocateClick={handleLocateClick}
          isLoading={isLoading}
          showMapPanel={true}
        />
        
        {/* Always show Map Panel - takes 2/3 width */}
        <div className="w-2/3 relative">
          {/* Show controls only when route is active */}
          {showMap && (
            <div className="absolute top-4 left-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900">Navigation</h3>
                {selectedToLocation && (
                  <p className="text-sm text-gray-600">To: {selectedToLocation.name}</p>
                )}
              </div>
              <div className="flex gap-2">
                {routeData && !isNavigationMode && (
                  <button
                    onClick={handleStartNavigation}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    Start Navigation
                  </button>
                )}
                {isNavigationMode && (
                  <button
                    onClick={handleStopNavigation}
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    Stop Navigation
                  </button>
                )}
                <button
                  onClick={handleResetMap}
                  className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
                >
                  Clear Route
                </button>
              </div>
            </div>
          )}

          {/* Map Container - always visible */}
          <div className="h-full w-full">
            <RouteMap
              route={routeData}
              isNavigating={isNavigationMode}
              showUserLocation={true}
            />
          </div>
        </div>
        
        {/* Error Display - positioned absolutely to overlay */}
        {error && (
          <div className="absolute bottom-4 left-4 right-4 z-50 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </LocationProvider>
  );
}