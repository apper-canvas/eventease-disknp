import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Form steps
const STEPS = {
  BASIC_INFO: 0,
  DETAILS: 1,
  TICKETS: 2,
  REVIEW: 3
};

// Initial form state
const initialFormState = {
  title: '',
  category: '',
  startDate: '',
  endDate: '',
  location: '',
  description: '',
  imageUrl: '',
  ticketTypes: [
    { name: 'General Admission', price: '', quantity: '', description: '' }
  ]
};

export default function MainFeature() {
  const [currentStep, setCurrentStep] = useState(STEPS.BASIC_INFO);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Icon definitions
  const CalendarIcon = getIcon('Calendar');
  const MapPinIcon = getIcon('MapPin');
  const TicketIcon = getIcon('Ticket');
  const PencilIcon = getIcon('Pencil');
  const ImageIcon = getIcon('Image');
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  // Categories same as in Home.jsx
  const eventCategories = [
    { id: 'music', name: 'Music', icon: 'Music' },
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'sports', name: 'Sports', icon: 'Trophy' },
    { id: 'tech', name: 'Technology', icon: 'Cpu' },
    { id: 'food', name: 'Food & Drink', icon: 'Utensils' },
    { id: 'arts', name: 'Arts', icon: 'Palette' }
  ];
  
  // Update form field
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Update ticket field
  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets[index] = {
      ...updatedTickets[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      ticketTypes: updatedTickets
    }));
    
    // Clear error
    if (errors[`ticket_${index}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`ticket_${index}_${field}`]: undefined
      }));
    }
  };
  
  // Add new ticket type
  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        { name: '', price: '', quantity: '', description: '' }
      ]
    }));
  };
  
  // Remove ticket type
  const removeTicketType = (index) => {
    if (formData.ticketTypes.length <= 1) {
      toast.error("You must have at least one ticket type");
      return;
    }
    
    const updatedTickets = [...formData.ticketTypes];
    updatedTickets.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      ticketTypes: updatedTickets
    }));
  };
  
  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === STEPS.BASIC_INFO) {
      if (!formData.title.trim()) newErrors.title = "Event title is required";
      if (!formData.category) newErrors.category = "Please select a category";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        
        if (start > end) {
          newErrors.endDate = "End date cannot be before start date";
        }
      }
    }
    
    if (currentStep === STEPS.DETAILS) {
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (formData.description.trim().length < 20) newErrors.description = "Description must be at least 20 characters";
    }
    
    if (currentStep === STEPS.TICKETS) {
      formData.ticketTypes.forEach((ticket, index) => {
        if (!ticket.name.trim()) newErrors[`ticket_${index}_name`] = "Ticket name is required";
        if (!ticket.price) newErrors[`ticket_${index}_price`] = "Price is required";
        if (!ticket.quantity) newErrors[`ticket_${index}_quantity`] = "Quantity is required";
        
        if (ticket.price && isNaN(parseFloat(ticket.price))) {
          newErrors[`ticket_${index}_price`] = "Price must be a number";
        }
        
        if (ticket.quantity && isNaN(parseInt(ticket.quantity))) {
          newErrors[`ticket_${index}_quantity`] = "Quantity must be a number";
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (!validateStep()) {
      toast.error("Please fix the errors before continuing");
      return;
    }
    
    if (currentStep < STEPS.REVIEW) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > STEPS.BASIC_INFO) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Event created successfully!");
      console.log("Form data submitted:", formData);
      
      // Reset form after successful submission
      setFormData(initialFormState);
      setCurrentStep(STEPS.BASIC_INFO);
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Step indicator
  const StepIndicator = ({ step, label, isActive, isCompleted }) => {
    return (
      <div className="flex flex-col items-center">
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isActive 
              ? 'bg-primary text-white' 
              : isCompleted 
                ? 'bg-green-500 text-white' 
                : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
          }`}
        >
          {isCompleted ? <CheckIcon size={20} /> : step + 1}
        </div>
        <span className={`mt-2 text-xs font-medium ${
          isActive || isCompleted 
            ? 'text-surface-800 dark:text-surface-200' 
            : 'text-surface-500 dark:text-surface-500'
        }`}>
          {label}
        </span>
      </div>
    );
  };
  
  // Step progress indicator
  const renderStepIndicator = () => {
    const steps = [
      { label: "Basic Info" },
      { label: "Details" },
      { label: "Tickets" },
      { label: "Review" }
    ];
    
    return (
      <div className="flex justify-between items-center w-full max-w-3xl mx-auto mb-8 px-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <StepIndicator 
              step={index}
              label={step.label}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
            />
            
            {index < steps.length - 1 && (
              <div className={`h-0.5 w-12 sm:w-20 md:w-32 mx-2 ${
                currentStep > index 
                  ? 'bg-green-500' 
                  : 'bg-surface-200 dark:bg-surface-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Basic Info Form
  const renderBasicInfoForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Event Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a catchy title for your event"
          className={`input-field ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">
          Category *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {eventCategories.map((category) => {
            const CategoryIcon = getIcon(category.icon);
            const isSelected = formData.category === category.id;
            
            return (
              <motion.button
                key={category.id}
                type="button"
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary dark:border-primary-light bg-primary bg-opacity-10 dark:bg-primary-dark dark:bg-opacity-20'
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                }`}
                onClick={() => {
                  setFormData(prev => ({ ...prev, category: category.id }));
                  if (errors.category) {
                    setErrors(prev => ({ ...prev, category: undefined }));
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-2 rounded-full ${
                  isSelected 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                }`}>
                  <CategoryIcon size={20} />
                </div>
                <span className="mt-1 text-sm font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium mb-1">
            Start Date & Time *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
              <CalendarIcon size={18} />
            </div>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.startDate ? 'border-red-500 dark:border-red-500' : ''}`}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium mb-1">
            End Date & Time *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
              <CalendarIcon size={18} />
            </div>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.endDate ? 'border-red-500 dark:border-red-500' : ''}`}
              min={formData.startDate || new Date().toISOString().slice(0, 16)}
            />
          </div>
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
          )}
        </div>
      </div>
    </div>
  );
  
  // Details Form
  const renderDetailsForm = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location *
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
            <MapPinIcon size={18} />
          </div>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where will the event be held?"
            className={`input-field pl-10 ${errors.location ? 'border-red-500 dark:border-red-500' : ''}`}
                          </div>
                        </div>
          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description *
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-surface-500">
            <PencilIcon size={18} />
          </div>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event. What can attendees expect?"
            rows={5}
            className={`input-field pl-10 ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
          {formData.description.length} / 500 characters
        </p>
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
          Image URL <span className="text-surface-500 dark:text-surface-400">(Optional)</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
            <ImageIcon size={18} />
          </div>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="input-field pl-10"
          />
        </div>
        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
          Provide a URL to an image that represents your event
        </p>
      </div>
    </div>
  );
  
  // Tickets Form
  const renderTicketsForm = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Ticket Types</h3>
        <motion.button
          type="button"
          className="btn btn-outline flex items-center"
          onClick={addTicketType}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={formData.ticketTypes.length >= 5}
        >
          <PlusIcon size={16} className="mr-1" />
          Add Ticket Type
        </motion.button>
      </div>
      
      <div className="space-y-6">
        <AnimatePresence>
          {formData.ticketTypes.map((ticket, index) => (
            <motion.div
              key={index}
              className="neu-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold flex items-center">
                  <TicketIcon size={18} className="mr-2 text-primary dark:text-primary-light" />
                  Ticket Type #{index + 1}
                </h4>
                {formData.ticketTypes.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeTicketType(index)}
                  >
                    {getIcon('Trash2')({ size: 18 })}
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ticket Name *
                  </label>
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                    placeholder="e.g. General Admission, VIP, etc."
                    className={`input-field ${errors[`ticket_${index}_name`] ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors[`ticket_${index}_name`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`ticket_${index}_name`]}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      placeholder="0.00"
                      className={`input-field ${errors[`ticket_${index}_price`] ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors[`ticket_${index}_price`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`ticket_${index}_price`]}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                      placeholder="100"
                      className={`input-field ${errors[`ticket_${index}_quantity`] ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors[`ticket_${index}_quantity`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`ticket_${index}_quantity`]}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description <span className="text-surface-500 dark:text-surface-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={ticket.description}
                  onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                  placeholder="What's included with this ticket type?"
                  className="input-field"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
  
  // Review Form
  const renderReviewForm = () => {
    // Find category name
    const categoryName = eventCategories.find(c => c.id === formData.category)?.name || '';
    
    return (
      <div className="space-y-6">
        <motion.div 
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0">
            <AlertTriangleIcon size={20} />
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Please review your event details</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Make sure all information is correct before submitting. You can go back to make any changes.
            </p>
          </div>
        </motion.div>
        
        <div className="divide-y divide-surface-200 dark:divide-surface-700">
          <div className="py-4">
            <h3 className="text-lg font-bold mb-4">{formData.title || 'Untitled Event'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="text-primary dark:text-primary-light mr-2">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    {formData.startDate ? new Date(formData.startDate).toLocaleString() : 'Not set'} - <br />
                    {formData.endDate ? new Date(formData.endDate).toLocaleString() : 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-primary dark:text-primary-light mr-2">
                  <MapPinIcon size={18} />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">
                    {formData.location || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-start">
              <div className="text-primary dark:text-primary-light mr-2 mt-1">
                {getIcon(eventCategories.find(c => c.id === formData.category)?.icon || 'Tag')({ size: 18 })}
              </div>
              <div>
                <p className="font-medium">Category</p>
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  {categoryName || 'Not selected'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-4">
            <div className="flex items-start">
              <div className="text-primary dark:text-primary-light mr-2 mt-1">
                <PencilIcon size={18} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Description</p>
                <p className="text-surface-600 dark:text-surface-400 text-sm whitespace-pre-line">
                  {formData.description || 'No description provided'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-4">
            <p className="font-medium mb-2 flex items-center">
              <TicketIcon size={18} className="text-primary dark:text-primary-light mr-2" />
              Ticket Types ({formData.ticketTypes.length})
            </p>
            
            <div className="space-y-4 mt-3">
              {formData.ticketTypes.map((ticket, index) => (
                <div 
                  key={index}
                  className="bg-surface-100 dark:bg-surface-800 rounded-lg p-3"
                >
                  <div className="flex justify-between">
                    <p className="font-medium">{ticket.name || `Ticket Type #${index + 1}`}</p>
                    <p className="font-bold">${parseFloat(ticket.price || 0).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400 mt-1">
                    <p>{ticket.description || 'No description'}</p>
                    <p>Qty: {ticket.quantity || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render current step form
  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case STEPS.BASIC_INFO:
        return renderBasicInfoForm();
      case STEPS.DETAILS:
        return renderDetailsForm();
      case STEPS.TICKETS:
        return renderTicketsForm();
      case STEPS.REVIEW:
        return renderReviewForm();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      {renderStepIndicator()}
      
      {/* Form */}
      <motion.div 
        className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">
            {currentStep === STEPS.BASIC_INFO && "Event Basics"}
            {currentStep === STEPS.DETAILS && "Event Details"}
            {currentStep === STEPS.TICKETS && "Set Up Tickets"}
            {currentStep === STEPS.REVIEW && "Review & Publish"}
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            {currentStep === STEPS.BASIC_INFO && "Let's start with the essential information about your event."}
            {currentStep === STEPS.DETAILS && "Now, add some more details about your event."}
            {currentStep === STEPS.TICKETS && "Set up the different ticket types for your event."}
            {currentStep === STEPS.REVIEW && "Review all your event details before publishing."}
          </p>
        </div>
        
        <form>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStepForm()}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className={`btn flex items-center ${
                currentStep > STEPS.BASIC_INFO 
                  ? 'btn-outline' 
                  : 'opacity-0 pointer-events-none'
              }`}
              onClick={handlePrevious}
              disabled={currentStep === STEPS.BASIC_INFO || isSubmitting}
            >
              <ChevronLeftIcon size={18} className="mr-1" />
              Previous
            </button>
            
            <button
              type="button"
              className="btn btn-primary flex items-center"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {currentStep < STEPS.REVIEW ? (
                    <>
                      Next
                      <ChevronRightIcon size={18} className="ml-1" />
                    </>
                  ) : (
                    <>
                      Create Event
                      <CheckIcon size={18} className="ml-1" />
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}