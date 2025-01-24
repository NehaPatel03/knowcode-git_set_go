import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Camera, Mic, PhoneOff, Video, VideoOff } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";

interface Consultant {
  id: number;
  name: string;
  expertise: string;
  image: string;
  availability: string[];
}

interface BookedSession {
  consultantId: number;
  consultantName: string;
  date: Date;
  time: string;
  status: "upcoming" | "completed";
}

const consultants: Consultant[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    expertise: "Business Strategy",
    image: "/public/consultantimg.png",
    availability: ["10:00", "11:00", "14:00", "15:00"],
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    expertise: "Financial Planning",
    image: "/public/consultantimg.png",
    availability: ["09:00", "13:00", "16:00", "17:00"],
  },
];

const Consultancy = () => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const handleBooking = () => {
    if (selectedConsultant && selectedDate && selectedTime) {
      const newSession: BookedSession = {
        consultantId: selectedConsultant.id,
        consultantName: selectedConsultant.name,
        date: selectedDate,
        time: selectedTime,
        status: "upcoming",
      };
      setBookedSessions([...bookedSessions, newSession]);
      toast.success("Session booked successfully!");
      setIsBookingOpen(false);
      setSelectedDate(undefined);
      setSelectedTime("");
    }
  };

  const startVideoSession = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      setIsVideoOpen(true);
    } catch (error) {
      toast.error("Failed to access camera and microphone");
    }
  };

  const stopVideoSession = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsVideoOpen(false);
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !isCameraOn);
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Our Expert Mentors</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultants.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-card p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => {
                setSelectedConsultant(consultant);
                setIsBookingOpen(true);
              }}
            >
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{consultant.name}</h3>
              <p className="text-muted-foreground text-center">{consultant.expertise}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Booked Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedSessions.map((session, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow">
                <h3 className="font-semibold">{session.consultantName}</h3>
                <p className="text-muted-foreground">
                  {session.date.toLocaleDateString()} at {session.time}
                </p>
                <Button
                  className="mt-4"
                  onClick={startVideoSession}
                >
                  Start Session
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book a Session</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="grid grid-cols-2 gap-2">
                {selectedConsultant?.availability.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <Button onClick={handleBooking}>Book Session</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <div className="flex flex-col items-center">
              {stream && (
                <video
                  autoPlay
                  playsInline
                  ref={(videoElement) => {
                    if (videoElement) {
                      videoElement.srcObject = stream;
                    }
                  }}
                  className="w-full rounded-lg mb-4"
                />
              )}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleCamera}
                >
                  {isCameraOn ? <Video /> : <VideoOff />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMic}
                >
                  {isMicOn ? <Mic /> : <Camera />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={stopVideoSession}
                >
                  <PhoneOff />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Consultancy;