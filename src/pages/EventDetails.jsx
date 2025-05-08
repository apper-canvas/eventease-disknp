import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Mock event data for detailed view
const eventDetails = {
  1: {
    id: 1,
    title: "Summer Music Festival",
    description: "The biggest outdoor music festival with top artists from around the world. Join us for three days of incredible performances across multiple stages featuring a diverse lineup of musical genres. From rock and pop to electronic and hip-hop, there's something for every music lover. The festival also includes food stalls from celebrated chefs, art installations, and interactive experiences throughout the venue.",
    longDescription: "Experience the ultimate summer celebration with the Summer Music Festival, the premier outdoor music event of the year. Spanning three days, this festival brings together over 60 artists across 5 stages, creating an unforgettable musical journey.\n\nMain Stage headliners include Grammy-winning artists and chart-topping performers who will light up the night with spectacular production. The Electronic Dome will feature world-class DJs spinning until late, while the Acoustic Garden provides an intimate setting for singer-songwriters.\n\nBeyond music, explore the Art Walk with installations from contemporary artists, recharge at the Wellness Zone with yoga and meditation sessions, and savor cuisine from over 30 food vendors representing global flavors. The Festival Village offers craft shopping, interactive games, and lounge areas for relaxing between sets.",
    date: "2023-08-15T18:00:00",
    endDate: "2023-08-17T23:00:00",
    location: "Central Park, New York",
    address: "5th Ave, New York, NY 10022",
    imageUrl: "https://source.unsplash.com/random/1200x800/?concert",
    category: "music",
    organizer: {
      name: "Melody Productions",
      logo: "https://source.unsplash.com/random/100x100/?logo",
      description: "Premier event organizers specializing in music festivals and concerts since 2005.",
      contactEmail: "info@melodyproductions.com",
      contactPhone: "+1 (555) 123-4567"
    },
    ticketOptions: [
      { id: "standard", name: "Standard", price: 89.99, description: "General admission for all three days" },
      { id: "vip", name: "VIP", price: 199.99, description: "VIP access with premium viewing areas and exclusive lounge" },
      { id: "platinum", name: "Platinum", price: 349.99, description: "All VIP benefits plus backstage tours and artist meet & greets" }
    ],
    amenities: ["Food & Drink", "Restrooms", "Parking", "Wheelchair Accessible", "First Aid"]
  },
  2: {
    id: 2,
    title: "Tech Innovation Summit",
    description: "Connect with industry leaders and discover the latest tech innovations.",
    longDescription: "The Tech Innovation Summit is where technology's brightest minds gather to explore the future of innovation. This two-day conference features keynote speeches from industry pioneers, hands-on workshops with cutting-edge technologies, and networking opportunities with tech leaders from around the globe.\n\nDay one focuses on emerging technologies including AI, blockchain, and quantum computing with in-depth technical sessions led by experts. Day two explores practical applications and business impact across industries, featuring case studies and panel discussions.\n\nThe Innovation Expo runs throughout the event, showcasing products and prototypes from established tech giants and promising startups alike. Dedicated networking sessions, including a gala dinner, provide ample opportunities to connect with potential partners, investors, and collaborators.",
    date: "2023-07-22T09:00:00",
    endDate: "2023-07-23T18:00:00",
    location: "Convention Center, San Francisco",
    address: "747 Howard St, San Francisco, CA 94103",
    imageUrl: "https://source.unsplash.com/random/1200x800/?technology",
    category: "tech",
    organizer: {
      name: "TechForward Events",
      logo: "https://source.unsplash.com/random/100x100/?tech",
      description: "Specialized in creating impactful technology conferences and networking events.",
      contactEmail: "events@techforward.com",
      contactPhone: "+1 (555) 987-6543"
    },
    ticketOptions: [
      { id: "standard", name: "General Admission", price: 149.99, description: "Access to all sessions and the expo" },
      { id: "business", name: "Business Pass", price: 299.99, description: "General admission plus workshop access and networking lunch" },
      { id: "executive", name: "Executive Pass", price: 499.99, description: "All-access pass including VIP networking events and exclusive sessions" }
    ],
    amenities: ["Wi-Fi", "Coffee & Refreshments", "Lunch Included", "Charging Stations", "Coat Check"]
  },
  3: {
    id: 3,
    title: "Food & Wine Expo",
    description: "Taste incredible cuisines and premium wines from around the globe.",
    longDescription: "The Food & Wine Expo is a gastronomic adventure celebrating the finest culinary traditions and innovations from around the world. This one-day extravaganza brings together renowned chefs, sommeliers, food artisans, and wine producers under one roof.\n\nExplore over 100 tasting stations featuring international cuisines, from Mediterranean delicacies to Asian specialties and everything in between. The Wine Pavilion showcases selections from premier vineyards across six continents, with guided tastings led by master sommeliers.\n\nThroughout the day, the Culinary Stage hosts live cooking demonstrations where celebrity chefs share their techniques and recipes. Interactive workshops offer hands-on experiences in pasta making, chocolate pairing, cocktail mixing, and more. The Artisan Marketplace provides opportunities to purchase specialty ingredients, cookbooks, and culinary tools to take home.",
    date: "2023-09-05T12:00:00",
    endDate: "2023-09-05T20:00:00",
    location: "Marina Bay, Singapore",
    address: "10 Bayfront Avenue, Singapore 018956",
    imageUrl: "https://source.unsplash.com/random/1200x800/?food",
    category: "food",
    organizer: {
      name: "Global Gastronomy Group",
      logo: "https://source.unsplash.com/random/100x100/?food",
      description: "Curators of premium food and beverage experiences across Asia-Pacific.",
      contactEmail: "hello@globalgastronomy.com",
      contactPhone: "+65 8765 4321"
    },
    ticketOptions: [
      { id: "standard", name: "General Entry", price: 65.00, description: "Access to all tasting stations and demonstrations" },
      { id: "premium", name: "Premium Package", price: 110.00, description: "General entry plus exclusive wine tastings and gift bag" },
      { id: "masterclass", name: "Masterclass Bundle", price: 175.00, description: "Premium package plus two masterclass sessions of your choice" }
    ],
    amenities: ["Food Sampling", "Wine Tasting", "Live Demonstrations", "Water Stations", "Seating Areas"]
  },
  4: {
    id: 4,
    title: "Business Leadership Conference",
    description: "Learn strategies from successful CEOs and business leaders.",
    longDescription: "The Business Leadership Conference is the premier gathering for executives, entrepreneurs, and aspiring leaders seeking to advance their careers and transform their organizations. This intensive two-day conference delivers actionable insights from those who have defined success in the modern business landscape.\n\nThe program features keynote addresses from Fortune 500 CEOs, successful entrepreneurs, and thought leaders who share their journeys, challenges, and strategies for success. Breakout sessions cover critical topics including strategic planning, organizational culture, digital transformation, financial management, and sustainable business practices.\n\nThe Leadership Lab offers personalized coaching sessions with executive mentors, while the Strategy Workshops provide collaborative problem-solving opportunities in small groups. Throughout the conference, structured networking events facilitate meaningful connections with peers across industries and geographical regions.",
    date: "2023-08-28T10:00:00",
    endDate: "2023-08-29T17:00:00",
    location: "Grand Hotel, London",
    address: "1-8 Russell Square, London WC1B 5BE, UK",
    imageUrl: "https://source.unsplash.com/random/1200x800/?business",
    category: "business",
    organizer: {
      name: "Executive Excellence",
      logo: "https://source.unsplash.com/random/100x100/?business",
      description: "Creating transformative learning experiences for business professionals worldwide.",
      contactEmail: "info@executiveexcellence.co.uk",
      contactPhone: "+44 20 7123 4567"
    },
    ticketOptions: [
      { id: "standard", name: "Professional", price: 199.99, description: "Access to all main sessions and networking events" },
      { id: "executive", name: "Executive", price: 349.99, description: "Professional access plus executive workshops and priority seating" },
      { id: "corporate", name: "Corporate Team", price: 899.99, description: "Access for a team of 3 with executive benefits and private meeting room" }
    ],
    amenities: ["Conference Materials", "Breakfast & Lunch", "Evening Reception", "Business Lounge", "Coat Check"]
  }
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Icons
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const MapPinIcon = getIcon('MapPin');
  const TicketIcon = getIcon('Ticket');
  const InfoIcon = getIcon('Info');
  const MailIcon = getIcon('Mail');
  const PhoneIcon = getIcon('Phone');
  const CheckIcon = getIcon('Check');
  const ArrowLeftIcon = getIcon('ArrowLeft');

  useEffect(() => {
    // Simulate API call to fetch event details
    setLoading(true);
    setTimeout(() => {
      const foundEvent = eventDetails[id];
      if (foundEvent) {
        setEvent(foundEvent);
        // Set the first ticket option as default
        if (foundEvent.ticketOptions && foundEvent.ticketOptions.length > 0) {
          setSelectedTicket(foundEvent.ticketOptions[0].id);
        }
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleReserve = () => {
    const ticketOption = event.ticketOptions.find(t => t.id === selectedTicket);
    toast.success(`Reserved ${ticketOption.name} ticket for ${event.title}!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pb-12">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button 
            onClick={() => navigate('/')} 
            className="mb-4 flex items-center text-white hover:text-primary-light transition-colors"
          >
            <ArrowLeftIcon size={20} className="mr-2" />
            Back to Events
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">About This Event</h2>
              <p className="text-surface-800 dark:text-surface-200 whitespace-pre-line">
                {event.longDescription || event.description}
              </p>
            </div>

            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary dark:text-primary-light mr-3 mt-1">
                    <CalendarIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Date & Time</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      {formatDate(event.date)} - {event.endDate ? formatDate(event.endDate) : 'N/A'}
                    </p>
                    <p className="text-surface-600 dark:text-surface-400">
                      {formatTime(event.date)} - {event.endDate ? formatTime(event.endDate) : 'Until completion'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary dark:text-primary-light mr-3 mt-1">
                    <MapPinIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-surface-600 dark:text-surface-400">{event.location}</p>
                    <p className="text-surface-600 dark:text-surface-400">{event.address}</p>
                  </div>
                </div>

                {event.amenities && event.amenities.length > 0 && (
                  <div className="flex items-start">
                    <div className="text-primary dark:text-primary-light mr-3 mt-1">
                      <InfoIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Amenities</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.amenities.map((amenity, index) => (
                          <span 
                            key={index}
                            className="bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Organizer</h2>
              <div className="flex items-start">
                {event.organizer.logo && (
                  <img 
                    src={event.organizer.logo} 
                    alt={event.organizer.name} 
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{event.organizer.name}</h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-3">
                    {event.organizer.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MailIcon size={16} className="text-surface-500 mr-2" />
                      <a href={`mailto:${event.organizer.contactEmail}`} className="text-primary dark:text-primary-light hover:underline">
                        {event.organizer.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <PhoneIcon size={16} className="text-surface-500 mr-2" />
                      <a href={`tel:${event.organizer.contactPhone}`} className="text-primary dark:text-primary-light hover:underline">
                        {event.organizer.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Ticket Purchase */}
          <div className="md:col-span-1">
            <div className="card p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <TicketIcon size={20} className="text-primary dark:text-primary-light mr-2" />
                Reserve Tickets
              </h2>

              <div className="space-y-4 mb-6">
                {event.ticketOptions.map(ticket => (
                  <div 
                    key={ticket.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTicket === ticket.id 
                        ? 'border-primary dark:border-primary-light bg-primary bg-opacity-5 dark:bg-opacity-10' 
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                    }`}
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{ticket.name}</h3>
                      <span className="font-bold text-lg">${ticket.price.toFixed(2)}</span>
                    </div>
                    <p className="text-surface-600 dark:text-surface-400 text-sm">
                      {ticket.description}
                    </p>
                    {selectedTicket === ticket.id && (
                      <div className="text-primary dark:text-primary-light text-sm mt-2 flex items-center">
                        <CheckIcon size={16} className="mr-1" />
                        Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button 
                className="btn btn-primary w-full text-lg font-semibold" 
                onClick={handleReserve}
              >
                Reserve Now
              </button>

              <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-4">
                Secure payment processed by EventEase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}