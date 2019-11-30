import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBOYS3jPJ-XQ1zTIKf6L_GKFXV5WPGEm9w';


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       videos:[],
       selectedVideo: null
    };

    this.videoSearch('Omar suleiman');
  }



    videoSearch(term){
          //fetch videos from API & insert it into the above array called "this.state.videos"
    YTSearch({key:API_KEY, term: term}, (videos) => {   //jquery syntax
      this.setState({
        videos:videos,
      selectedVideo:videos[0]
        });    
      });
  
    }
    
  
  
  render(){
const videoSearch = _.debounce((term) => {this.videoSearch(term)},1000);

    return(
      <div> <br></br>
        <SearchBar onSearchTermChange={videoSearch}/> <br></br>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
        onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
        videos={this.state.videos}/> 
      </div>
    );
  }
  
}

ReactDOM.render( <App />, document.querySelector('.container'));
