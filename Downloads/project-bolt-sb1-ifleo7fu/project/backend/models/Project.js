const mongoose = require('mongoose');

const userStorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, 'El título de la historia de usuario es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  estimatedHours: {
    type: Number,
    min: [0, 'Las horas estimadas no pueden ser negativas'],
    default: 0
  }
}, {
  timestamps: true
});

const pageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'El nombre de la página es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  route: {
    type: String,
    required: [true, 'La ruta es requerida'],
    trim: true
  },
  userStories: [userStorySchema]
}, {
  timestamps: true
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del proyecto es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning'
  },
  color: {
    type: String,
    default: '#3B82F6',
    match: [/^#[0-9A-F]{6}$/i, 'El color debe ser un código hexadecimal válido']
  },
  techStack: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^https?:\/\/.+/.test(v);
      },
      message: 'La URL de GitHub debe ser una URL válida'
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El ID del usuario es requerido']
  },
  pages: [pageSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
projectSchema.index({ userId: 1, createdAt: -1 });
projectSchema.index({ name: 'text', description: 'text' });

// Virtual for total user stories count
projectSchema.virtual('totalUserStories').get(function() {
  return this.pages.reduce((total, page) => total + page.userStories.length, 0);
});

// Virtual for completed user stories count
projectSchema.virtual('completedUserStories').get(function() {
  return this.pages.reduce((total, page) => {
    return total + page.userStories.filter(story => story.status === 'completed').length;
  }, 0);
});

module.exports = mongoose.model('Project', projectSchema);