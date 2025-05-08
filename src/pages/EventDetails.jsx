import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [reservingTicket, setReservingTicket] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const { scrollY } = useScroll();
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
  const UserIcon = getIcon('User');
  const CompassIcon = getIcon('Compass');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CheckCircleIcon = getIcon('CheckCircle');
  const PlusIcon = getIcon('Plus');
  const MinusIcon = getIcon('Minus');
  const ShoppingCartIcon = getIcon('ShoppingCart');

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
          // Initialize ticket quantities
          const quantities = {};
          foundEvent.ticketOptions.forEach(ticket => quantities[ticket.id] = 0);
          setTicketQuantities(quantities);
        }
      }
      setLoading(false);
    }, 800);
  }, [id]);

  // Parallax effect for hero image
  const heroImageY = useTransform(scrollY, [0, 300], [0, 100]);

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

  const handleIncreaseQuantity = (ticketId) => {
    setTicketQuantities(prev => ({
      ...prev,
      [ticketId]: Math.min((prev[ticketId] || 0) + 1, 10) // Max 10 tickets per type
    }));
  };

  const handleDecreaseQuantity = (ticketId) => {
    setTicketQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max((prev[ticketId] || 0) - 1, 0)
    }));
  };

  const calculateTotal = () => {
    if (!event) return 0;
    return event.ticketOptions.reduce((total, ticket) => {
      return total + (ticket.price * (ticketQuantities[ticket.id] || 0));
    }, 0);
  };

  const handleReserve = () => {
      if (!selectedTicket) {
        toast.error(
          <div className="flex items-center">
            <span>Please select a ticket type</span>
          </div>,
          { className: "font-medium" }
        );
        return;
      }

      // Check if any tickets are selected
      const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0);
      if (totalTickets === 0) {
        toast.error(
          <div className="flex items-center">
            <span>Please select at least one ticket</span>
          </div>,
          { className: "font-medium" }
        );
        return;
      }

      // Get selected tickets with quantities
      const selectedTickets = event.ticketOptions.filter(t => ticketQuantities[t.id] > 0);

      setReservingTicket(true);
      
      // Simulate API call with a short delay
      setTimeout(() => {
        const ticketOption = event.ticketOptions.find(t => t.id === selectedTicket);
        
        toast.success(
          <div className="flex items-center">
            <CheckCircleIcon className="mr-2 flex-shrink-0" size={18} />
            <div>
              <p className="font-bold">Ticket Reserved!</p>
              <p className="text-sm">{totalTickets} ticket(s) for {event.title}</p>
              <p className="text-sm font-medium">Total: ${calculateTotal().toFixed(2)}</p>
            </div>
          </div>,
          { className: "font-medium", autoClose: 5000 }
        );
        
        setReservingTicket(false);
      }, 1500);
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
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pb-12 overflow-hidden">
      {/* Hero Image */}
      <motion.div className="relative h-64 md:h-[400px] lg:h-[500px] overflow-hidden">
        <motion.div style={{ y: heroImageY }} className="absolute inset-0">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="p-6">
            <motion.button 
              onClick={() => navigate('/')} 
              className="flex items-center text-white hover:text-primary-light transition-colors bg-black/30 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon size={18} className="mr-2" />
              Back to Events
            </motion.button>
          </div>
          
          <div className="p-6 md:p-10 max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-sm font-medium mb-2 uppercase tracking-wider"
            >
              {event.category.toUpperCase()} EVENT
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              {event.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-white/90"
            >
              <div className="flex items-center">
                <CalendarIcon size={18} className="mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon size={18} className="mr-2" />
                <span>{formatTime(event.date)}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon size={18} className="mr-2" />
                <span>{event.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm transition-all border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('about')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'about' 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'details' 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              }`}
            >
              Event Details
            </button>
            <button 
              onClick={() => setActiveTab('location')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'location' 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              }`}
            >
              Location
            </button>
            <button 
              onClick={() => setActiveTab('organizer')}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'organizer' 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              }`}
            >
              Organizer
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="card p-6 md:p-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-surface-900 dark:text-surface-50">
                    {event.title}
                  </h1>
                  <div className="flex items-center mb-6">
                    <span className="px-3 py-1 bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light rounded-full text-sm font-medium">
                      {event.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="card p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">About This Event</h2>
                  <p className="text-surface-800 dark:text-surface-200 whitespace-pre-line leading-relaxed">
                    {event.longDescription || event.description}
                  </p>
                </div>

                {event.imageUrl && (
                  <div className="card p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
                    
                    <div className="mt-8 rounded-xl overflow-hidden">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                )}

              </motion.div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="card p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Date & Time</h2>
                  <div className="flex items-start">
                    <div className="text-primary dark:text-primary-light mr-4 mt-1 rounded-full bg-primary/10 dark:bg-primary-dark/20 p-3">
                      <CalendarIcon size={24} />
                    </div>
                    <div>
                      <div className="mb-4">
                        <h3 className="font-bold text-lg">Start</h3>
                        <p className="text-surface-600 dark:text-surface-400">
                          {formatDate(event.date)} at {formatTime(event.date)}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg">End</h3>
                        <p className="text-surface-600 dark:text-surface-400">
                          {event.endDate ? `${formatDate(event.endDate)} at ${formatTime(event.endDate)}` : 'Until completion'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {event.amenities && event.amenities.length > 0 && (
                  <div className="card p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.amenities.map((amenity, index) => {
                        const AmenityIcon = getIcon(amenity.includes('Food') ? 'Utensils' : 
                                                  amenity.includes('Drink') ? 'Coffee' :
                                                  amenity.includes('Wi-Fi') ? 'Wifi' :
                                                  amenity.includes('Parking') ? 'Car' :
                                                  amenity.includes('Restroom') ? 'Bath' :
                                                  amenity.includes('Accessible') ? 'Accessibility' :
                                                  amenity.includes('Aid') ? 'FirstAid' : 
                                                  'Check');
                        
                        return (
                          <div key={index} className="flex items-center p-4 bg-surface-100 dark:bg-surface-700 rounded-xl">
                            <div className="bg-white dark:bg-surface-600 p-2 rounded-lg mr-3 text-primary dark:text-primary-light">
                              <AmenityIcon size={18} />
                            </div>
                            <span className="font-medium text-sm">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Event Location</h2>
                <div className="flex items-start">
                  <div className="text-primary dark:text-primary-light mr-4 mt-1 rounded-full bg-primary/10 dark:bg-primary-dark/20 p-3">
                    <MapPinIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{event.location}</h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-6">{event.address}</p>
                    
                    <div className="aspect-video w-full bg-surface-200 dark:bg-surface-700 rounded-xl overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CompassIcon size={48} className="text-surface-400 dark:text-surface-500" />
                        <span className="absolute font-medium text-surface-500 dark:text-surface-400 mt-16">Map preview</span>
                      </div>
                    </div>
                    
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-primary dark:text-primary-light hover:underline"
                    >
                      <MapPinIcon size={16} className="mr-1" />
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Organizer Tab */}
            {activeTab === 'organizer' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Event Organizer</h2>
                <div className="flex items-start">
                  {event.organizer.logo ? (
                    <img 
                      src={event.organizer.logo} 
                      alt={event.organizer.name} 
                      className="w-20 h-20 rounded-xl object-cover mr-5"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-primary/10 dark:bg-primary-dark/20 flex items-center justify-center mr-5">
                      <UserIcon size={32} className="text-primary dark:text-primary-light" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-xl text-surface-900 dark:text-surface-50">
                      {event.organizer.name}
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400 mt-1 mb-4 leading-relaxed">
                      {event.organizer.description}
                    </p>
                    
                    <div className="space-y-3">
                      <a 
                        href={`mailto:${event.organizer.contactEmail}`} 
                        className="flex items-center py-2 px-3 bg-surface-100 dark:bg-surface-700 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                      >
                        <div className="bg-white dark:bg-surface-600 p-1.5 rounded-md mr-3 text-primary dark:text-primary-light">
                          <MailIcon size={18} />
                        </div>
                        <span className="font-medium">{event.organizer.contactEmail}</span>
                      </a>
                      
                      <a 
                        href={`tel:${event.organizer.contactPhone}`}
                        className="flex items-center py-2 px-3 bg-surface-100 dark:bg-surface-700 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                      >
                        <div className="bg-white dark:bg-surface-600 p-1.5 rounded-md mr-3 text-primary dark:text-primary-light">
                          <PhoneIcon size={18} />
                        </div>
                        <span className="font-medium">{event.organizer.contactPhone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Ticket Purchase */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6 md:p-8 sticky top-20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <TicketIcon size={22} className="text-primary dark:text-primary-light mr-3" />
                Reserve Tickets
              </h2>

              <div className="space-y-4 mb-6">
                  <motion.div 
                    key={ticket.id}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      ticketQuantities[ticket.id] > 0
                        ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary-dark/10' 
                        : 'border-surface-200 dark:border-surface-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg">{ticket.name}</h3>
                        <span className="font-bold text-xl text-primary dark:text-primary-light">
                          ${ticket.price.toFixed(2)}
                        </span>
                        Selected
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">
                        {ticket.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <motion.button
                            type="button"
                            className="bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 h-8 w-8 rounded-l-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleDecreaseQuantity(ticket.id)}
                            disabled={ticketQuantities[ticket.id] <= 0}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MinusIcon size={16} />
                          </motion.button>
                          <div className="h-8 bg-white dark:bg-surface-800 flex items-center justify-center px-4 border-t border-b border-surface-200 dark:border-surface-700">
                            <span className="font-medium w-4 text-center">
                              {ticketQuantities[ticket.id] || 0}
                            </span>
                          </div>
                          <motion.button
                            type="button"
                            className="bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 h-8 w-8 rounded-r-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleIncreaseQuantity(ticket.id)}
                            disabled={ticketQuantities[ticket.id] >= 10}
                            whileTap={{ scale: 0.95 }}
                          >
                            <PlusIcon size={16} />
                          </motion.button>
                        </div>
                        
                        {ticketQuantities[ticket.id] > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="font-medium text-primary dark:text-primary-light"
                          >
                            ${(ticket.price * ticketQuantities[ticket.id]).toFixed(2)}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                        </motion.div>
                ))}
              </div>
              <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-xl">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>


              <motion.button 
                disabled={reservingTicket || Object.values(ticketQuantities).every(qty => qty === 0)}
                disabled={reservingTicket || !selectedTicket}
                onClick={handleReserve}
                whileHover={!reservingTicket ? { scale: 1.03 } : {}}
                whileTap={!reservingTicket ? { scale: 0.97 } : {}}
              >
                {reservingTicket ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                    Processing Order...
              </motion.button>
                ) : (
                  <span className="flex items-center justify-center"><ShoppingCartIcon size={18} className="mr-2" />Reserve Now · ${calculateTotal().toFixed(2)}</span>
                )}
              <div className="mt-4 flex items-center justify-center text-surface-500 dark:text-surface-400">
                <InfoIcon size={16} className="mr-2" />
                <p className="text-sm">Secure payment processed by EventEase</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}