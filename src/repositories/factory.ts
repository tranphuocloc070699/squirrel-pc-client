import YoutubeRepository from './repository/youtube.repository';


const repositories  = {
    'youtube': YoutubeRepository
}

const RepositoryFactory= {
    get : (name: string) => {
        switch (name) {
            case 'youtube':
                return repositories.youtube
            default:
                break;
        }
    }
   
}

export default RepositoryFactory

