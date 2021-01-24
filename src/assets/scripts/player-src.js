const script = document.createElement('script');
script.src = 'https://sdk.scdn.co/spotify-player.js';
document.body.append(script);
script.onload = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = localStorage.getItem('token');
        const player = new Spotify.Player({
          name: 'App Player',
          getOAuthToken: cb => { cb(token); }
        });
        let volume = 0.5;
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
        function getTimeFromMilliseconds(s){
            const ms = s % 1000;
            s = (s - ms) / 1000;
            const secsFake = s % 60;
            s = (s - secsFake) / 60;
            const mins = s % 60;
            let secs = '';
            secsFake < 10 ? (secs = '0' + secsFake) : (secs = secsFake.toString());
            return mins + ':' + secs;
        }
        
        // Playback status updates
        document.getElementById('mainSlider').addEventListener('change', function(e) {
            fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${e.target.value}`, {
            method: 'PUT',    
            headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            }
        )
        });
        
        async function incr(state){
            if (!state.paused){
                document.getElementById('mainSlider').value = state.position;
            }
        }
        player.addListener('player_state_changed', state => {
            console.log(state);
            let slider = document.getElementById('mainSlider');
            slider.setAttribute('max', `${state.track_window.current_track.duration_ms}`);
            document.getElementById('mainSlider').value = state.position;
            
            // document.getElementById('mainSlider').addEventListener('load', function(e) {
            //     if (!state.paused){
            //         console.log('not paused');
            //     }
            // });
            // document.getElementById('mainSlider').onload = (e) => {
            //     console.log(123);
            //     setInterval(() => {
            //         if (state.paused){
            //             e.target.value += 0.1;
            //         }
            //     }, 1000);
            // };
            let leftTime = document.getElementById('leftTime');
            let rightTime = document.getElementById('rightTime');
            rightTime.innerHTML = getTimeFromMilliseconds(state.track_window.current_track.duration_ms);
            // leftTime.innerHTML = state.position;
            const songName = document.getElementById('songName');
            songName.innerHTML = `${state.track_window.current_track.name}`;
            const id = state.track_window.current_track.album.uri.split(':')[2];
            songName.setAttribute(`href`, `/album/${id}`);
            const img = document.getElementById('songImg');
            img.setAttribute('src', `${state.track_window.current_track.album.images[1].url}`);
            const artists = document.getElementById('songArtists');
                if (artists.hasChildNodes()){
                    const children = artists.children;
                    for (const child of children) {
                        child.remove();
                    }
                }
                
                for (let i = 0; i < state.track_window.current_track.artists.length; i++) {
                    const a = document.createElement('a');
                    if (i !== state.track_window.current_track.artists.length - 1){
                        a.innerHTML = state.track_window.current_track.artists[i].name;
                        a.innerHTML += ', ';
                    }else{
                        a.innerHTML = state.track_window.current_track.artists[i].name;
                    }
                    artists.append(a);
                }
                if (artists.children.length !== 1){
                    artists.children[0].remove();
                } 
                
            }
            
        );
        
        document.getElementById('volumeSlider').addEventListener('input', async (e) => {
            await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value * 100}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                
            }
        );
        });

        // Ready
        player.addListener('ready', async ({ device_id }) => {
            console.log(`${device_id} is ready!`); 
            await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    device_ids: [
                        device_id
                    ]
                })
            });
        });
    
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
    
        // Connect to the player!
        player.connect();
        
      };
};
