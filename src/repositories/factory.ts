import YoutubeRepository from './repository/youtube.repository'
import PodcastRepository from './repository/podcast.repository'


const RepositoryFactory = {
  youtube:YoutubeRepository,
  podcast:PodcastRepository,
}

export default RepositoryFactory
