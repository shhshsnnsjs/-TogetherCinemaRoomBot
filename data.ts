import type { Movie } from './types'

// Демо-каталог. Замените demo videoUrl на легальные ссылки на видео,
// которыми вы владеете или которые разрешены правообладателем.
export const movies: Movie[] = [
  {
    id: 1, title: 'Полночь в Париже', year: 2011, genre: 'Романтика', rating: '7.7',
    duration: '1 ч 34 мин', badge: 'Для свидания',
    description: 'Романтичная история о мечтах, любви и прогулках по волшебному Парижу.',
    poster: 'https://image.tmdb.org/t/p/w500/4wBG5kbfagTQclETblPRRGihk0I.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/fO0njY2wG2k8gM8QkQ2gG9bJ8xP.jpg'
  },
  {
    id: 2, title: 'Ла-Ла Ленд', year: 2016, genre: 'Мюзикл', rating: '8.0',
    duration: '2 ч 08 мин', badge: 'Любимчик',
    description: 'Музыка, огни большого города и история двух людей, которые следуют за мечтой.',
    poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0_rf.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/nNl5W7f6V7W2QmJ6F6X3Y8k7g4L.jpg'
  },
  {
    id: 3, title: 'Гордость и предубеждение', year: 2005, genre: 'Драма', rating: '7.8',
    duration: '2 ч 09 мин',
    description: 'Красивая история о чувствах, характере и любви, которая меняет всё.',
    poster: 'https://image.tmdb.org/t/p/w500/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/8x7ej0LnHdKU9RlC4YDK3xAG6kY.jpg'
  },
  {
    id: 4, title: 'Вечное сияние чистого разума', year: 2004, genre: 'Фантастика', rating: '8.0',
    duration: '1 ч 48 мин',
    description: 'Необычная и трогательная история о памяти, близости и втором шансе.',
    poster: 'https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/7y3eYvTsGjxPYDtSnumCLIMDkrV.jpg'
  },
  {
    id: 5, title: '10 причин моей ненависти', year: 1999, genre: 'Комедия', rating: '7.3',
    duration: '1 ч 37 мин', badge: 'Лёгкий вечер',
    description: 'Лёгкая романтическая комедия о неожиданной симпатии и первых чувствах.',
    poster: 'https://image.tmdb.org/t/p/w500/ujERk3aKABXU3M5y6B3B4y2h6hV.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/8Yy8V0m8M6V8w6q8Y4y9k6F8w2Q.jpg'
  },
  {
    id: 6, title: 'Перед рассветом', year: 1995, genre: 'Романтика', rating: '8.1',
    duration: '1 ч 41 мин',
    description: 'Двое незнакомцев проводят вместе одну ночь, разговаривая обо всём на свете.',
    poster: 'https://image.tmdb.org/t/p/w500/ey3M8Jqf8b7s8JQv6m5J9J7K7VQ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/w1280/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
  }
]
