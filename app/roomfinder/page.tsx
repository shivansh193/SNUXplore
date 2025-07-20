"use client";

function getCurrentISTTime(): string {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString().slice(11, 16); // "HH:MM"
}

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseURL = "https://empty-room-api.onrender.com/";
const apiKey = process.env.NEXT_PUBLIC_ROOM_API_KEY || "null";

function convertTo12HourFormat(time24: string): string {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

async function fetchFromAPI(path: string, params: Record<string, string>) {
    const query = new URLSearchParams({ ...params, "no-delay-key": apiKey }).toString();
    const res = await fetch(`${baseURL}${path}?${query}`);
    if (!res.ok) {
        let errorDetail = "API error";
        try {
            const errorData = await res.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) {
            errorDetail = res.statusText;
        }
        throw new Error(`Failed to fetch: ${errorDetail} (Status: ${res.status})`);
    }
    return res.json();
}

export default function RoomFinder() {
    const [room, setRoom] = useState("");
    const [day, setDay] = useState("Mon");
    const [startTime, setStartTime] = useState(getCurrentISTTime());
    const [endTime, setEndTime] = useState(""); // Optional
    const [data, setData] = useState<any>(null);
    const [schedule, setSchedule] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleCheckAvailability() {
        try {
            setError(null);
            setData(null);
            const formattedStart = convertTo12HourFormat(startTime);
            const formattedEnd = endTime ? convertTo12HourFormat(endTime) : null;

            const res = formattedEnd
                ? await fetchFromAPI("check-interval", {
                    roomname: room,
                    day: day,
                    starttime: formattedStart,
                    endtime: formattedEnd,
                })
                : await fetchFromAPI("check-instant", {
                    roomname: room,
                    day: day,
                    time: formattedStart,
                });

            setData(res);
        } catch (err: any) {
            setError(err.message || "Failed to fetch availability.");
        }
    }

    async function handleSchedule() {
        try {
            setError(null);
            setSchedule(null);
            const res = await fetchFromAPI("room-day-sched", {
                roomname: room,
                day: day,
            });
            setSchedule(res);
        } catch (err: any) {
            setError(err.message || "Failed to fetch schedule.");
        }
    }

    async function handleFindFreeRooms() {
        try {
            setError(null);
            setData(null);
            const formattedStart = convertTo12HourFormat(startTime);
            const formattedEnd = endTime ? convertTo12HourFormat(endTime) : null;

            const res = formattedEnd
                ? await fetchFromAPI("list-interval", {
                    day: day,
                    starttime: formattedStart,
                    endtime: formattedEnd,
                })
                : await fetchFromAPI("list-instant", {
                    day: day,
                    time: formattedStart,
                });

            setData(res);
        } catch (err: any) {
            setError(err.message || "Failed to find free rooms.");
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Tabs defaultValue="check" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="schedule">Room Schedule</TabsTrigger>
                    <TabsTrigger value="check">Check Availability</TabsTrigger>
                    <TabsTrigger value="search">Find Free Rooms</TabsTrigger>
                </TabsList>

                {/* Check Availability */}
                <TabsContent value="check">
                    <Card>
                        <CardHeader>
                            <CardTitle>Check Room Availability</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Input
                                placeholder="Room Name (e.g. D217)"
                                value={room}
                                onChange={(e) => setRoom(e.target.value.toUpperCase())}
                            />
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            >
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <label className="block text-sm font-medium">Start Time*</label>
                            <input
                                type="time"
                                className="w-full border rounded-md px-3 py-2"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />

                            <label className="block text-sm font-medium mt-2">End Time (optional)</label>
                            <input
                                type="time"
                                className="w-full border rounded-md px-3 py-2"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />

                            <p className="text-sm text-gray-500">
                                Leave &quot;End Time&quot; blank to check at a single time.
                            </p>
                            <Button onClick={handleCheckAvailability}>Check Availability</Button>
                            {data && typeof data.available === "boolean" && (
                                <div className="mt-4 p-4 rounded-md border flex items-center gap-4 bg-gray-50">
                                    <div className={`text-2xl ${data.available ? "text-green-600" : "text-red-600"}`}>
                                        {data.available ? "✔️" : "❌"}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">
                                            Room <span className="font-bold">{data.roomname}</span> is{" "}
                                            <span className={data.available ? "text-green-600" : "text-red-600"}>
                                                {data.available ? "Available" : "Occupied"}
                                            </span>
                                        </p>
                                        <p className="text-gray-500">
                                            On {data.day} at{" "}
                                            {"interval" in data ? data.interval : data.time}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {data && typeof data.available === "string" && (
                                <div className="mt-4 p-4 rounded-md bg-red-100 text-red-800 text-sm border border-red-300">
                                    ❌ {data.available}: <strong>{data.roomname}</strong>
                                </div>
                            )}
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Room Schedule */}
                <TabsContent value="schedule">
                    <Card>
                        <CardHeader>
                            <CardTitle>View Room Schedule for a Day</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Input
                                placeholder="Room Name (e.g. D217)"
                                value={room}
                                onChange={(e) => setRoom(e.target.value.toUpperCase())}
                            />
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            >
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                            <Button onClick={handleSchedule}>Get Schedule</Button>
                            {schedule && Array.isArray(schedule.Result) && (
                                <div className="mt-4 overflow-x-auto">
                                    <p className="text-sm mb-2 text-gray-600">
                                        Schedule for <strong>{schedule.roomname}</strong> on <strong>{schedule.day}</strong>
                                    </p>
                                    <table className="w-full text-sm border rounded-md overflow-hidden">
                                        <thead className="bg-muted text-left">
                                            <tr>
                                                <th className="p-2 border">Course</th>
                                                <th className="p-2 border">From</th>
                                                <th className="p-2 border">Until</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedule.Result.map((entry: any, idx: number) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="p-2 border">{entry["Course Code & Component"]}</td>
                                                    <td className="p-2 border">{entry.From}</td>
                                                    <td className="p-2 border">{entry.Until}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {schedule && typeof schedule.Result === "string" && (
                                <div className="mt-4 p-4 rounded-md bg-red-100 text-red-800 text-sm border border-red-300">
                                    ❌ {schedule.Result}: <strong>{schedule.roomname}</strong>
                                </div>
                            )}
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Find Free Rooms */}
                <TabsContent value="search">
                    <Card>
                        <CardHeader>
                            <CardTitle>Find Free Rooms by Time</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                            >
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>

                            <label className="block text-sm font-medium">Start Time*</label>
                            <input
                                type="time"
                                className="w-full border rounded-md px-3 py-2"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />

                            <label className="block text-sm font-medium mt-2">End Time (optional)</label>
                            <input
                                type="time"
                                className="w-full border rounded-md px-3 py-2"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />

                            <p className="text-sm text-gray-500">
                                Leave &quot;End Time&quot; blank to find rooms free at a single time.
                            </p>
                            <Button onClick={handleFindFreeRooms}>Find Free Rooms</Button>
                            {Array.isArray(data?.available) && data.available.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm mb-2 text-gray-600">
                                        Rooms available on <strong>{data.day}</strong>{" "}
                                        {data.interval ? `(${data.interval})` : `at ${data.time}`}
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {data.available.map((room: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="px-3 py-2 border rounded bg-green-50 text-green-800 text-sm text-center shadow-sm"
                                            >
                                                {room}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {Array.isArray(data?.available) && data.available.length === 0 && (
                                <div className="mt-4 p-4 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300">
                                    ⚠️ No rooms available for the selected slot.
                                </div>
                            )}

                            {typeof data?.available === "string" && (
                                <div className="mt-4 p-4 rounded-md bg-red-100 text-red-800 text-sm border border-red-300">
                                    ❌ {data.available}: <strong>{data.roomname}</strong>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
