import { useMemo, useState } from 'react'
import { Heart, Search, Play, Sparkles, Film, Bookmark, ArrowLeft, X, Star, Clock3, Popcorn, SlidersHorizontal } from 'lucide-react'
import { movies } from './data'
import type { Movie } from './types'

declare global {
  interface Window { Telegram?: { WebApp?: any } }
}

const genres = ['Все', 'Романтика', 'Комедия', 'Драма', 'Мюзикл', 'Фантастика']

export default function App() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Все')
  const [favorites, setFavorites] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem('love-cinema-favs') || '[]') } catch { return [] }
  })
  const [showFavorites, setShowFavorites] = useState(false)
  const [selected, setSelected] = useState<Movie | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [toast, setToast] = useState('')

  const toggleFavorite = (id: number) => {
    const next = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id]
    setFavorites(next)
    localStorage.setItem('love-cinema-favs', JSON.stringify(next))
  }

  const visibleMovies = useMemo(() => movies.filter(movie => {
    const matchesText = movie.title.toLowerCase().includes(query.toLowerCase())
    const matchesGenre = genre === 'Все' || movie.genre === genre
    const matchesFav = !showFavorites || favorites.includes(movie.id)
    return matchesText && matchesGenre && matchesFav
  }), [query, genre, showFavorites, favorites])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2300)
  }

  const openMovie = (movie: Movie) => {
    setSelected(movie)
    setVideoUrl(movie.videoUrl || '')
  }

  const startMovie = () => {
    if (!videoUrl.trim()) {
      notify('Добавьте ссылку на видео, чтобы начать просмотр 💗')
      return
    }
    setSelected({ ...selected!, videoUrl })
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark"><Heart size={18} fill="currentColor" /></div>
        <div className="brand-copy"><b>love cinema</b><span>ваш маленький кинотеатр</span></div>
        <button className={`icon-button ${showFavorites ? 'active' : ''}`} onClick={() => setShowFavorites(!showFavorites)} aria-label="Избранное">
          <Heart size={19} fill={showFavorites ? 'currentColor' : 'none'} />
        </button>
      </header>

      {selected ? (
        <section className="detail-view">
          <button className="back-button" onClick={() => setSelected(null)}><ArrowLeft size={17}/> Назад к фильмам</button>
          <div className="detail-hero" style={{ backgroundImage: `linear-gradient(0deg, #fff3f6 0%, rgba(255,243,246,.15) 100%), url(${selected.backdrop || selected.poster})` }} />
          <div className="detail-content">
            <div className="detail-heading">
              <div><span className="eyebrow">ВАШ ВЕЧЕР НАЧИНАЕТСЯ ЗДЕСЬ</span><h1>{selected.title}</h1></div>
              <button className={`heart-button ${favorites.includes(selected.id) ? 'liked' : ''}`} onClick={() => toggleFavorite(selected.id)}><Heart fill={favorites.includes(selected.id) ? 'currentColor' : 'none'}/></button>
            </div>
            <div className="meta-row"><span>{selected.year}</span><span>·</span><span>{selected.genre}</span><span>·</span><span><Star size={14} fill="currentColor"/> {selected.rating}</span><span>·</span><span><Clock3 size={14}/> {selected.duration}</span></div>
            <p className="description">{selected.description}</p>
            <div className="watch-card">
              <div className="watch-card-title"><span className="play-bubble"><Play size={15} fill="currentColor"/></span><div><b>Смотреть вместе</b><small>Вставьте прямую ссылку на видео</small></div></div>
              <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://example.com/movie.mp4" />
              <button className="primary-button" onClick={startMovie}><Play size={17} fill="currentColor"/> Открыть плеер</button>
              {selected.videoUrl && <video className="video-player" controls playsInline src={selected.videoUrl}>Ваш браузер не поддерживает видео.</video>}
              <p className="hint">Подойдут прямые ссылки на MP4/WebM или разрешённые видеохостинги с встраиваемым плеером. Каталог не содержит сами фильмы.</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="welcome-card">
            <div className="floating-heart heart-one">♡</div><div className="floating-heart heart-two">♥</div>
            <div className="welcome-content">
              <span className="welcome-kicker"><Sparkles size={13}/> DATE NIGHT</span>
              <h1>Кино, плед<br/>и <em>мы вдвоём</em></h1>
              <p>Выбирайте фильм, устраивайтесь поудобнее и пусть вечер будет особенным.</p>
              <div className="welcome-footer"><span><Heart size={14} fill="currentColor"/> made for two</span><span className="tiny-popcorn">🍿</span></div>
            </div>
            <div className="welcome-art"><div className="moon"></div><div className="ticket"><span>LOVE</span><Heart size={25} fill="currentColor"/><small>TONIGHT</small></div><div className="sparkle s1">✦</div><div className="sparkle s2">✧</div></div>
          </section>

          <section className="section-head">
            <div><span className="eyebrow">ВЫБИРАЕМ НАСТРОЕНИЕ</span><h2>{showFavorites ? 'Наше избранное' : 'Что посмотрим?'} <span>💗</span></h2></div>
            <span className="movie-count">{visibleMovies.length} фильма</span>
          </section>

          <div className="search-wrap"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Найти фильм для двоих..." /><SlidersHorizontal size={17} className="search-filter"/></div>

          <nav className="genre-list">
            {genres.map(item => <button key={item} onClick={() => setGenre(item)} className={genre === item ? 'genre-chip selected' : 'genre-chip'}>{item}</button>)}
          </nav>

          <section className="movie-grid">
            {visibleMovies.map(movie => (
              <article className="movie-card" key={movie.id} onClick={() => openMovie(movie)}>
                <div className="poster-wrap">
                  <img src={movie.poster} alt={`Постер ${movie.title}`} loading="lazy" onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/500x750/ffe1e9/b75d7c?text=Love+Cinema' }}/>
                  {movie.badge && <span className="movie-badge">{movie.badge}</span>}
                  <button className={`card-heart ${favorites.includes(movie.id) ? 'liked' : ''}`} onClick={e => { e.stopPropagation(); toggleFavorite(movie.id) }} aria-label="В избранное"><Heart size={17} fill={favorites.includes(movie.id) ? 'currentColor' : 'none'}/></button>
                  <div className="poster-play"><Play size={18} fill="currentColor"/></div>
                </div>
                <div className="movie-info"><div className="movie-title-row"><h3>{movie.title}</h3><span className="rating"><Star size={12} fill="currentColor"/> {movie.rating}</span></div><p>{movie.year} <span>·</span> {movie.genre}</p></div>
              </article>
            ))}
          </section>
          {visibleMovies.length === 0 && <div className="empty-state"><span>💌</span><b>Пока ничего не нашлось</b><p>Попробуйте другой запрос или жанр.</p></div>}
        </>
      )}

      <footer className="footer"><div className="footer-heart">♡</div><b>made with love</b><span>ваши вечера — ваша история</span></footer>
      {toast && <div className="toast">{toast}</div>}
      <div className="bottom-note"><Popcorn size={14}/> уютного просмотра вам двоим <Heart size={12} fill="currentColor"/></div>
    </main>
  )
}
