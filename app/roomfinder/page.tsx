// components/RoomFinder.jsx (or wherever you have this component)

"use client";

import { useState, useEffect } from "react";

// --- Helper Functions (No changes needed here) ---
function getCurrentISTTime(): string {
    const now = new Date();
    // In a client component, we should get the time on mount to avoid server-client mismatch
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString().slice(11, 16); // "HH:MM"
}

function convertTo12HourFormat(time24: string): string {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

const baseURL = "https://empty-room-api.onrender.com/";
const apiKey = process.env.NEXT_PUBLIC_EMPTY_ROOM_API_KEY || "null";

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

// --- Main Component (Re-styled) ---
export default function RoomFinder() {
    // --- State Management (No changes needed here) ---
    const [room, setRoom] = useState("");
    const [day, setDay] = useState("Mon");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [data, setData] = useState<any>(null);
    const [schedule, setSchedule] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("check");

    // Set initial time on client mount to prevent hydration errors
    useEffect(() => {
        setStartTime(getCurrentISTTime());
    }, []);

    // --- API Handlers (No changes needed here, just added loading state) ---
    const handleAPICall = async (apiCall: () => Promise<void>) => {
        setLoading(true);
        setError(null);
        setData(null);
        setSchedule(null);
        try {
            await apiCall();
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleCheckAvailability = () => handleAPICall(async () => {
        const formattedStart = convertTo12HourFormat(startTime);
        const formattedEnd = endTime ? convertTo12HourFormat(endTime) : null;
        const res = formattedEnd
            ? await fetchFromAPI("check-interval", { roomname: room, day, starttime: formattedStart, endtime: formattedEnd })
            : await fetchFromAPI("check-instant", { roomname: room, day, time: formattedStart });
        setData(res);
    });

    const handleSchedule = () => handleAPICall(async () => {
        const res = await fetchFromAPI("room-day-sched", { roomname: room, day });
        setSchedule(res);
    });

    const handleFindFreeRooms = () => handleAPICall(async () => {
        const formattedStart = convertTo12HourFormat(startTime);
        const formattedEnd = endTime ? convertTo12HourFormat(endTime) : null;
        const res = formattedEnd
            ? await fetchFromAPI("list-interval", { day, starttime: formattedStart, endtime: formattedEnd })
            : await fetchFromAPI("list-instant", { day, time: formattedStart });
        setData(res);
    });

    // --- Re-styled Form Elements for the new theme ---
    const ThemedInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input {...props} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all" />
    );
    const ThemedSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
        <select {...props} className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all appearance-none bg-no-repeat bg-right-4" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundSize: '1.5em 1.5em' }} />
    );
    const ThemedButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
        <button onClick={onClick} disabled={loading} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-lg mt-4 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Searching...' : children}
        </button>
    );

    return (
        <div className="bg-[#1C1C1C] min-h-screen text-white pt-16 pb-24">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-extrabold">
                    <span className="text-yellow-400">Room </span>
                    <span className="text-orange-500">Finder</span>
                </h1>
                <p className="text-gray-400 mt-3">Find empty classrooms on campus effortlessly.</p>
            </div>

            <div className="max-w-2xl mx-auto px-4">
                {/* --- Themed Tabs --- */}
                <div className="flex justify-center gap-2 md:gap-4 mb-8">
                    {[{id: 'schedule', label: 'Room Schedule'}, {id: 'check', label: 'Check Room'}, {id: 'search', label: 'Find Free'}].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- Tab Content --- */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    {/* Check Availability */}
                    {activeTab === 'check' && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white mb-2">Check Room Availability</h2>
                            <ThemedInput placeholder="Room Name (e.g. D217)" value={room} onChange={(e) => setRoom(e.target.value.toUpperCase())} />
                            <ThemedSelect value={day} onChange={(e) => setDay(e.target.value)}>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <option key={d} value={d}>{d}</option>)}
                            </ThemedSelect>
                            <div><label className="text-sm text-gray-400">Start Time*</label><ThemedInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required /></div>
                            <div><label className="text-sm text-gray-400">End Time (optional)</label><ThemedInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></div>
                            <ThemedButton onClick={handleCheckAvailability}>Check Now</ThemedButton>
                        </div>
                    )}

                    {/* Room Schedule */}
                    {activeTab === 'schedule' && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white mb-2">View Room Schedule</h2>
                            <ThemedInput placeholder="Room Name (e.g. D217)" value={room} onChange={(e) => setRoom(e.target.value.toUpperCase())} />
                            <ThemedSelect value={day} onChange={(e) => setDay(e.target.value)}>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <option key={d} value={d}>{d}</option>)}
                            </ThemedSelect>
                            <ThemedButton onClick={handleSchedule}>Get Schedule</ThemedButton>
                        </div>
                    )}
                    
                    {/* Find Free Rooms */}
                    {activeTab === 'search' && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white mb-2">Find Free Rooms</h2>
                            <ThemedSelect value={day} onChange={(e) => setDay(e.target.value)}>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <option key={d} value={d}>{d}</option>)}
                            </ThemedSelect>
                            <div><label className="text-sm text-gray-400">Start Time*</label><ThemedInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required /></div>
                            <div><label className="text-sm text-gray-400">End Time (optional)</label><ThemedInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></div>
                            <ThemedButton onClick={handleFindFreeRooms}>Find Free Rooms</ThemedButton>
                        </div>
                    )}
                </div>

                {/* --- Results Display Area --- */}
                <div className="mt-6 min-h-[100px]">
                    {error && <p className="text-red-400 text-center p-4 bg-red-900/50 rounded-lg">{error}</p>}
                    
                    {/* Availability Result */}
                    {data && typeof data.available === "boolean" && (
                        <div className={`p-4 rounded-lg flex items-center gap-4 ${data.available ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                            <div className="text-3xl">{data.available ? "✔️" : "❌"}</div>
                            <div>
                                <p className="font-bold text-lg">Room {data.roomname} is <span className={data.available ? 'text-green-300' : 'text-red-300'}>{data.available ? "Available" : "Occupied"}</span></p>
                                <p className="text-gray-300">On {data.day} at {"interval" in data ? data.interval : data.time}</p>
                            </div>
                        </div>
                    )}

                    {/* Schedule Result */}
                    {schedule && Array.isArray(schedule.Result) && (
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="font-bold mb-3">Schedule for {schedule.roomname} on {schedule.day}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="border-b border-gray-600"><tr className="text-gray-300">
                                        <th className="p-2">Course</th><th className="p-2">From</th><th className="p-2">Until</th>
                                    </tr></thead>
                                    <tbody>{schedule.Result.map((entry: any, idx: number) => (
                                        <tr key={idx} className="border-b border-gray-700 last:border-none">
                                            <td className="p-2">{entry["Course Code & Component"]}</td>
                                            <td className="p-2">{entry.From}</td><td className="p-2">{entry.Until}</td>
                                        </tr>
                                    ))}</tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Free Rooms Result */}
                    {Array.isArray(data?.available) && (
                        <div className="bg-gray-800/50 rounded-lg p-4">
                             <h3 className="font-bold mb-3">Rooms available on {data.day} {data.interval ? `from ${data.interval}` : `at ${data.time}`}</h3>
                             {data.available.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {data.available.map((room: string, idx: number) => (
                                        <div key={idx} className="bg-gray-700 text-center rounded-md py-2 px-1 font-mono shadow-sm">{room}</div>
                                    ))}
                                </div>
                             ) : (
                                <p className="text-yellow-300 text-center p-4 bg-yellow-900/50 rounded-lg">No rooms available for the selected slot.</p>
                             )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}