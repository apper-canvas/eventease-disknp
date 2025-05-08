import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Sample event data
const eventCategories = [
  { id: 'music', name: 'Music', icon: 'Music' },
  { id: 'business', name: 'Business', icon: 'Briefcase' },
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'tech', name: 'Technology', icon: 'Cpu' },
  { id: 'food', name: 'Food & Drink', icon: 'Utensils' },
  { id: 'arts', name: 'Arts', icon: 'Palette' }
];

const featuredEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "The biggest outdoor music festival with top artists from around the world.",
    date: "2023-08-15T18:00:00",
    location: "Central Park, New York",
    imageUrl: "https://source.unsplash.com/random/800x600/?concert",
    category: "music",
    price: 89.99
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    description: "Connect with industry leaders and discover the latest tech innovations.",
    date: "2023-07-22T09:00:00",
    location: "Convention Center, San Francisco",
    imageUrl: "https://source.unsplash.com/random/800x600/?technology",
    category: "tech",
    price: 149.99
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    description: "Taste incredible cuisines and premium wines from around the globe.",
    date: "2023-09-05T12:00:00",
    location: "Marina Bay, Singapore",
    imageUrl: "https://source.unsplash.com/random/800x600/?food",
    category: "food",
    price: 65.00
  },
  {
    id: 4,
    title: "Business Leadership Conference",
    description: "Learn strategies from successful CEOs and business leaders.",
    date: "2023-08-28T10:00:00",
    location: "Grand Hotel, London",
    imageUrl: "https://source.unsplash.com/random/800x600/?business",
    category: "business",
    price: 199.99
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(featuredEvents);
  
  // Icons
  const SearchIcon = getIcon('Search');
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const TicketIcon = getIcon('Ticket');
  
  useEffect(() => {
    // Filter events based on category and search query
    let result = [...featuredEvents];
    
    if (selectedCategory !== 'all') {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(result);
  }, [selectedCategory, searchQuery]);
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? 'all' : categoryId);
    
    if (categoryId === selectedCategory) {
      toast.info("Showing all events");
    } else {
      const category = eventCategories.find(cat => cat.id === categoryId);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
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

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover & Create <span className="text-secondary">Amazing Events</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl opacity-90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The all-in-one platform for event organizers and attendees
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href="#events" className="btn btn-secondary text-center">
                Explore Events
              </a>
              <a href="#create" className="btn bg-white text-primary hover:bg-surface-100 active:scale-95 text-center">
                Create Event
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Browse by Category</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {eventCategories.map((category) => {
              const CategoryIcon = getIcon(category.icon);
              const isSelected = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  className={`neu-card flex flex-col items-center justify-center py-4 transition-all ${
                    isSelected 
                      ? 'bg-primary bg-opacity-10 dark:bg-primary-dark dark:bg-opacity-20 border-2 border-primary dark:border-primary-light' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`p-3 rounded-full ${
                    isSelected 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                  }`}>
                    <CategoryIcon size={24} />
                  </div>
                  <span className="mt-2 font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Event search and listing */}
      <section id="events" className="py-12 bg-white dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
              {selectedCategory === 'all' 
                ? 'Upcoming Events' 
                : `${eventCategories.find(c => c.id === selectedCategory)?.name || ''} Events`}
            </h2>
            
            <div className="w-full md:w-auto relative">
              <input
                type="text"
                placeholder="Search events..."
                className="input-field pl-10 pr-4 py-2 md:w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
                <SearchIcon size={18} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <motion.div
                  key={event.id}
                  className="card group hover:shadow-lg hover:-translate-y-1 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
                      ${event.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center text-xs text-surface-500 dark:text-surface-400 mb-2">
                      <span className="flex items-center">
                        <CalendarIcon size={14} className="mr-1" />
                        {formatDate(event.date)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{formatTime(event.date)}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                    
                    <p className="text-surface-600 dark:text-surface-300 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-surface-500 dark:text-surface-400 mb-4">
                      <MapPinIcon size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    
                    <Link 
                      to={`/event/${event.id}`}
                      className="w-full btn btn-primary flex items-center justify-center no-underline"
                    >
                      <TicketIcon size={16} className="mr-2" />
                      Get Tickets
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-surface-400 dark:text-surface-500 mb-3">
                  {getIcon('SearchX')({ size: 48, className: "mx-auto mb-4" })}
                </div>
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-surface-500 dark:text-surface-400">
                  Try changing your search criteria or browse another category
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Feature section */}
      <section id="create" className="py-16 bg-surface-100 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Create Your Event</h2>
          <MainFeature />
        </div>
      </section>
    </div>
  );
}