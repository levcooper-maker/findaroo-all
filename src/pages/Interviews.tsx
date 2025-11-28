import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  ExternalLink
} from "lucide-react";

const interviews = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    position: "Senior Frontend Developer",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "45 min",
    type: "zoom",
    interviewer: "John Doe",
    status: "upcoming",
    meetingLink: "https://zoom.us/j/123456789"
  },
  {
    id: 2,
    candidate: "David Kim",
    position: "DevOps Engineer",
    date: "2024-01-21",
    time: "10:00 AM",
    duration: "60 min",
    type: "in-person",
    interviewer: "Jane Smith",
    location: "Conference Room A",
    status: "upcoming"
  },
  {
    id: 3,
    candidate: "Alex Turner",
    position: "Backend Developer",
    date: "2024-01-21",
    time: "3:30 PM",
    duration: "45 min",
    type: "zoom",
    interviewer: "Mike Wilson",
    status: "upcoming",
    meetingLink: "https://zoom.us/j/987654321"
  },
  {
    id: 4,
    candidate: "Emily Rodriguez",
    position: "Full Stack Engineer",
    date: "2024-01-22",
    time: "11:00 AM",
    duration: "60 min",
    type: "zoom",
    interviewer: "Sarah Brown",
    status: "upcoming",
    meetingLink: "https://zoom.us/j/456789123"
  },
  {
    id: 5,
    candidate: "Michael Chen",
    position: "Product Designer",
    date: "2024-01-18",
    time: "2:00 PM",
    duration: "45 min",
    type: "zoom",
    interviewer: "John Doe",
    status: "completed"
  },
  {
    id: 6,
    candidate: "Jessica Martinez",
    position: "Marketing Manager",
    date: "2024-01-19",
    time: "4:00 PM",
    duration: "30 min",
    type: "in-person",
    interviewer: "Jane Smith",
    location: "Conference Room B",
    status: "completed"
  }
];

const Interviews = () => {
  const upcomingInterviews = interviews.filter(i => i.status === "upcoming");
  const completedInterviews = interviews.filter(i => i.status === "completed");

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Interviews</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and schedule interviews with candidates
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-lg hover:shadow-xl transition-smooth">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        {/* Calendar Integration Card */}
        <Card className="p-6 bg-gradient-subtle border-accent/20">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Connect Your Calendar</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sync with Calendly, Google Calendar, or Outlook to automatically schedule interviews and avoid conflicts.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Connect Calendly
                </Button>
                <Button variant="outline" size="sm">
                  Connect Google Calendar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Upcoming Interviews */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Interviews</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {upcomingInterviews.map((interview) => (
              <Card key={interview.id} className="p-6 card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        interview.type === "zoom" ? "bg-primary/10" : "bg-accent/10"
                      }`}>
                        {interview.type === "zoom" ? (
                          <Video className={`h-6 w-6 ${
                            interview.type === "zoom" ? "text-primary" : "text-accent"
                          }`} />
                        ) : (
                          <MapPin className="h-6 w-6 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{interview.candidate}</h3>
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                        <Badge variant="outline" className="mt-2">
                          {interview.type === "zoom" ? "Zoom" : "In-person"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(interview.date).toLocaleDateString("en-US", { 
                          weekday: "short", 
                          month: "short", 
                          day: "numeric" 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{interview.time} • {interview.duration}</span>
                      </div>
                      {interview.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{interview.location}</span>
                        </div>
                      )}
                      <p className="text-muted-foreground">
                        Interviewer: <span className="font-medium text-foreground">{interview.interviewer}</span>
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {interview.meetingLink && (
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Join Meeting
                          </a>
                        </Button>
                      )}
                      <Button size="sm" className="flex-1">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Interviews */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Completed Interviews</h2>
          <div className="grid gap-4">
            {completedInterviews.map((interview) => (
              <Card key={interview.id} className="p-4 opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {interview.type === "zoom" ? (
                        <Video className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{interview.candidate}</p>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(interview.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric" 
                      })} at {interview.time}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      View Notes
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interviews;
