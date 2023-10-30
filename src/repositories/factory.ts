import YoutubeRepository from './repository/youtube.repository'
import PodcastRepository from './repository/podcast.repository'
import BookRepository from './repository/book.repository'
import AdminRepository from './repository/admin.repository'


const RepositoryFactory = {
  youtube:YoutubeRepository,
  podcast:PodcastRepository,
  admin:AdminRepository,
  book:BookRepository
}

export default RepositoryFactory
