const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Quiz questions in Swedish
const quizQuestions = [
  {
    id: 1,
    question: "Vad är huvudsyftet med din häck?",
    options: [
      { id: 'privacy', text: 'Insynsskydd', tags: ['privacy'] },
      { id: 'windbreak', text: 'Vindskydd', tags: ['windbreak'] },
      { id: 'decorative', text: 'Dekorativ', tags: ['decorative'] },
      { id: 'boundary', text: 'Gränsmarkering', tags: ['boundary'] }
    ]
  },
  {
    id: 2,
    question: "Vilken höjd önskar du på häcken?",
    options: [
      { id: 'low', text: 'Låg (under 1.5m)', tags: ['height_low'] },
      { id: 'medium', text: 'Medel (1.5-2.5m)', tags: ['height_medium'] },
      { id: 'high', text: 'Hög (över 2.5m)', tags: ['height_high'] }
    ]
  },
  {
    id: 3,
    question: "Hur snabbt vill du att häcken ska växa?",
    options: [
      { id: 'fast', text: 'Snabbt (30-40cm/år)', tags: ['fast_growth'] },
      { id: 'moderate', text: 'Måttligt (20-30cm/år)', tags: ['moderate_growth'] },
      { id: 'slow', text: 'Långsamt (10-20cm/år)', tags: ['slow_growth'] }
    ]
  },
  {
    id: 4,
    question: "Hur mycket underhåll vill du lägga på häcken?",
    options: [
      { id: 'low', text: 'Lågt (klippning 1 gång/år)', tags: ['low_maintenance'] },
      { id: 'medium', text: 'Medel (klippning 2 gånger/år)', tags: ['moderate_maintenance'] },
      { id: 'high', text: 'Högt (klippning 3+ gånger/år)', tags: ['high_maintenance'] }
    ]
  },
  {
    id: 5,
    question: "Föredrar du en vintergrön häck?",
    options: [
      { id: 'yes', text: 'Ja, vill ha grönt året runt', tags: ['evergreen'] },
      { id: 'no', text: 'Nej, bladfällande är okej', tags: ['deciduous'] }
    ]
  },
  {
    id: 6,
    question: "Vilka ljusförhållanden har platsen?",
    options: [
      { id: 'full_sun', text: 'Fullt solljus (6+ timmar/dag)', tags: ['full_sun'] },
      { id: 'partial_shade', text: 'Halvskugga (3-6 timmar/dag)', tags: ['partial_shade'] },
      { id: 'shade', text: 'Skugga (under 3 timmar/dag)', tags: ['shade'] }
    ]
  },
  {
    id: 7,
    question: "Hur är markdräneringen på platsen?",
    options: [
      { id: 'good', text: 'Bra dränering', tags: ['good_drainage'] },
      { id: 'moderate', text: 'Måttlig dränering', tags: ['moderate_drainage'] },
      { id: 'poor', text: 'Dålig dränering', tags: ['poor_drainage'] }
    ]
  },
  {
    id: 8,
    question: "Vad är din budget per meter?",
    options: [
      { id: 'economy', text: 'Ekonomisk (under 500kr/m)', tags: ['economy'] },
      { id: 'standard', text: 'Standard (500-1000kr/m)', tags: ['standard'] },
      { id: 'premium', text: 'Premium (över 1000kr/m)', tags: ['premium'] }
    ]
  }
];

// Product matching logic
const productRules = {
  'thuja-smaragd': {
    name: 'Thuja Smaragd',
    tags: ['evergreen', 'slow_growth', 'low_maintenance', 'full_sun', 'privacy', 'height_medium', 'height_high', 'premium', 'good_drainage'],
    description: 'Elegant och kompakt med vacker smaragdgrön färg. Perfekt för insynsskydd.',
    collection: 'thuja-smaragd'
  },
  'thuja-brabant': {
    name: 'Thuja Brabant',
    tags: ['evergreen', 'fast_growth', 'low_maintenance', 'full_sun', 'privacy', 'windbreak', 'height_high', 'economy', 'standard', 'good_drainage', 'moderate_drainage'],
    description: 'Snabbväxande och tät häck som ger snabbt resultat. Populäraste valet.',
    collection: 'thuja-brabant'
  },
  'avenbok': {
    name: 'Avenbok',
    tags: ['deciduous', 'moderate_growth', 'moderate_maintenance', 'partial_shade', 'windbreak', 'height_medium', 'height_high', 'standard', 'good_drainage', 'moderate_drainage'],
    description: 'Klassisk formklippt häck med vackert höstfärgat löv.',
    collection: 'avenbok'
  },
  '<span class="cursor">█</span>
