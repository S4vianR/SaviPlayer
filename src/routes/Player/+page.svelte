<script lang="ts">
	import Nav from '../../components/Nav.svelte';
	import { onMount, onDestroy, beforeUpdate } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	let audio: HTMLAudioElement;
	let isPlaying = false;
	let currentSongPlaying: string = 'Nothing playing...';
	let audioUrl: URL;
	let songUrl: URL;
	let currentSongUrl: string;
	// Song object with the URL and the title
	let songObject = {
		url: '',
		icon: '',
		title: ''
	};

	// Empty array to store all the songs
	let songs: Array<typeof songObject> = [
		// The folder structure is the next: /music/1/*.mp3, music/2/*.mp3, music/3/*.mp3, etc.
		// The title of the song is the name of the song that is in the folder
		// The URL is the path to the song
		{
			url: '/music/dubstep/1/TimeWithYou.mp3',
			icon: '/music/dubstep/1/time-with-you.jpg',
			title: 'Time With You'
		},
		{
			url: '/music/dubstep/2/StarsInTheSky.mp3',
			icon: '/music/dubstep/2/stars-in-the-sky.jpg',
			title: 'Stars In The Sky'
		},
		{
			url: '/music/dubstep/3/SpendItAll.mp3',
			icon: '/music/dubstep/3/spend-it-all.png',
			title: 'Spend It All'
		},
		{
			url: '/music/dubstep/4/FellForADemon.mp3',
			icon: '/music/dubstep/4/fell-for-a-demon.jpg',
			title: 'Fell For A Demon'
		},
		{
			url: '/music/dubstep/5/On&On.mp3',
			icon: '/music/dubstep/5/on-and-on.jpg',
			title: 'On & On'
		},
		{
			url: '/music/dubstep/6/Kadak.mp3',
			icon: '/music/dubstep/6/kadak.jpg',
			title: 'Kadak'
		},
		{
			url: '/music/chill/1/Limbo.mp3',
			icon: '/music/chill/1/limbo.jpg',
			title: 'Limbo'
		},
		{
			url: '/music/chill/2/Moments.mp3',
			icon: '/music/chill/2/moments.png',
			title: 'Moments'
		},
		{
			url: '/music/chill/3/NoWay.mp3',
			icon: '/music/chill/3/no-way.png',
			title: 'No Way'
		},
		{
			url: '/music/chill/4/Symphony.mp3',
			icon: '/music/chill/4/symphony.jpg',
			title: 'Symphony'
		}
	];

	beforeUpdate(async () => {
		const session = (await supabase.auth.getSession()).data.session?.user.id;

		if (!session) {
			window.location.href = '/';
		}
	});

	onMount(() => {
		if (typeof window !== 'undefined') {
			audio = new Audio();
			audio?.addEventListener('timeupdate', updateAudioTime);
			// Function to change the play/pause button when the song ends
			audio?.addEventListener('ended', () => {
				const playPauseButton =
					(document.getElementById('playPauseButton') as HTMLImageElement) || null;
				const allPlayPauseButtons =
					(document.querySelectorAll('#playButton') as NodeListOf<HTMLImageElement>) || null;

				playPauseButton.src = '/play.svg';
				allPlayPauseButtons.forEach((button) => {
					button.src = '/play.svg';
				});
				isPlaying = false;
				currentSongPlaying = 'Nothing playing...';
			});
		}
	});

	// Cuando el componente se destruye, eliminamos el evento 'timeupdate'
	onDestroy(() => {
		if (audio) {
			audio?.removeEventListener('timeupdate', updateAudioTime);
		}
	});

	const handleSongs = (url: string, event: MouseEvent, currentSong: string) => {
		const playPauseButton = (event.currentTarget as HTMLElement).querySelector(
			'#playButton'
		) as HTMLImageElement;
		const allPlayPauseButtons = document.querySelectorAll(
			'#playButton'
		) as NodeListOf<HTMLImageElement>;
		const playImg = document.getElementById('playImg') as HTMLImageElement;

		if (audio.src) {
			audioUrl = new URL(audio.src);
		}
		songUrl = new URL(url, window.location.href);

		if (currentSongUrl === songUrl.pathname) {
			currentSongUrl = '';
		} else {
			currentSongUrl = songUrl.pathname;
		}

		if (audioUrl && isPlaying == true && audioUrl.pathname === songUrl.pathname) {
			// If the same song is clicked while it's playing
			audio.pause();
			playPauseButton.src = '/play.svg';
			playImg.src = '/play.svg';
			isPlaying = false;
			currentSongPlaying = 'Nothing playing...';
		} else if (audioUrl && isPlaying == true && audioUrl.pathname !== songUrl.pathname) {
			// If a different song is clicked while another song is playing
			allPlayPauseButtons.forEach((button) => {
				button.src = '/play.svg';
			});
			audio.src = url;
			audio.play();
			playPauseButton.src = '/pause.svg';
			playImg.src = '/pause.svg';
			isPlaying = true;
			currentSongPlaying = currentSong;
		} else {
			// If no song is playing
			audio.src = url;
			audio.play();
			playPauseButton.src = '/pause.svg';
			playImg.src = '/pause.svg';
			isPlaying = true;
			currentSongPlaying = currentSong;
		}
	};

	const handleMainMediaControl = (event: MouseEvent) => {
		const playPauseButton = (event.currentTarget as HTMLElement).querySelector(
			'img'
		) as HTMLImageElement;
		const allPlayPauseButtons = document.querySelectorAll(
			'#buttonPlay #playButton'
		) as NodeListOf<HTMLImageElement>;

		if (currentSongUrl === songUrl.pathname) {
			currentSongUrl = '';
		} else {
			currentSongUrl = songUrl.pathname;
		}

		if (isPlaying) {
			audio.pause();
			playPauseButton.src = '/play.svg';
			allPlayPauseButtons.forEach((button) => {
				button.src = '/play.svg';
			});
			isPlaying = false;
		} else {
			audio.play();
			playPauseButton.src = '/pause.svg';
			allPlayPauseButtons.forEach((button) => {
				if (
					new URL(audio.src).pathname ===
					new URL(button.parentElement?.getAttribute('data-url') || '', window.location.href)
						.pathname
				) {
					button.src = '/pause.svg';
				}
			});
			isPlaying = true;
		}
	};

	// Function to update the audio timer
	const updateAudioTime = () => {
		const audioTimer = document.getElementById('audioTimer') as HTMLParagraphElement;
		const audioTimerLeft = document.getElementById('audioTimerLeft') as HTMLParagraphElement;
		const allPlayPauseButtons = document.querySelectorAll(
			'#buttonPlay img'
		) as NodeListOf<HTMLImageElement>;
		const playPauseButton = document.getElementById('playPauseButton') as HTMLImageElement;
		const audioDuration = audio.duration;
		const audioCurrentTime = audio.currentTime;

		// Make the time look like 0:00 instead of 0:0
		const formatTime = (time: number) => {
			let minutes = Math.floor(time / 60);
			let seconds = Math.floor(time % 60);
			return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
		};

		audioTimer.textContent = formatTime(audioCurrentTime);
		audioTimerLeft.textContent = formatTime(audioDuration);

		// If the audio is at the end, stop the audio and change the play button
		if (audioCurrentTime === audioDuration) {
			audio.pause();
			isPlaying = false;
			allPlayPauseButtons.forEach((button) => {
				button.src = '/play.svg';
			});
			playPauseButton.src = '/play.svg';
		}
	};
</script>

<div id="contentContaniner">
	<Nav />
	<main>
		<aside>
			<ul>
				<li>
					<img src="/icons/dubstep.jpg" alt="dubstep icon" />
					<a href="/Dubstep"> Dubstep </a>
				</li>
				<li>
					<img src="/icons/chill.jpg" alt="chill icon" />
					<a href="/Chill"> Chill </a>
				</li>
			</ul>
		</aside>
		<section>
			<div id="songsContainer">
				<h2>Tu música</h2>
				<!-- For each for all the songs in /music/*/* -->
				{#each songs as song}
					<div>
						<button
							on:click={(event) => handleSongs(song.url, event, song.title)}
							id="buttonPlay"
							data-url={song.url}
						>
							<img src="/play.svg" alt="playButton" id="playButton" height="24" width="24" />
							<img
								src={song.icon}
								alt={song.title}
								id="songIcon"
								height="55"
								width="55"
								class:playing={currentSongUrl === song.url}
							/>
							<p>{song.title}</p>
						</button>
					</div>
				{/each}
			</div>
			<div id="audioControlContainer">
				<!-- Audio control play/pause button and show title of the current song playing -->
				<p id="currentSongTitle">{currentSongPlaying}</p>
				<button id="playPauseButton" on:click={(event) => handleMainMediaControl(event)}>
					<img src="/play.svg" alt="playButton" id="playImg" />
				</button>
				<div>
					<!-- Audio timer -->
					<p id="audioTimer">0:00</p>
					<span>/</span>
					<!-- Audio timer left -->
					<p id="audioTimerLeft">0:00</p>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	.playing {
		animation: rotation 2s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}

	main {
		height: 90svh;
		display: grid;
		grid-template-columns: 15% 85%;
	}

	aside {
		padding: 1rem;
		border-right: 2px solid;
	}

	aside ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
		width: 100%;
	}

	aside > ul > li {
		width: 100%;
		padding: 0.2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 0.875rem;
		transition: background-color 0.3s ease-in-out;
	}

	aside > ul > li:hover {
		background-color: #303030;
	}

	aside > ul > li a {
		font-size: 1.25rem;
		font-weight: 600;
		text-decoration: none;
		color: #fff;
	}

	aside img {
		width: 55px;
		border-radius: 0.375rem;
		aspect-ratio: 1;
	}

	section {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	section #songsContainer {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	section #songsContainer > div {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	section #songsContainer > div > button {
		font-family: 'Montserrat', sans-serif;
		color: #fff;
		font-weight: 500;
		background-color: transparent;
		border: none;
		outline: none;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	section #songsContainer > div > button:hover {
		cursor: pointer;
	}

	section #songsContainer > div > button #playButton {
		transition: transform 0.3s ease-in-out;
	}

	section #songsContainer > div > button #playButton:hover {
		transform: scale(1.1);
	}

	section #songsContainer > div > button #songIcon {
		border-radius: 5.475rem;
	}

	section #audioControlContainer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		width: 100%;
		font-size: 1.1rem;
	}

	section #audioControlContainer div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 0.1rem;
	}

	section #audioControlContainer button {
		background-color: transparent;
		border: none;
		outline: none;
		width: fit-content;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	section #audioControlContainer button:hover {
		cursor: pointer;
	}

	section #audioControlContainer button img {
		height: 36px;
		aspect-ratio: 1;
		transition: transform 0.3s ease-in-out;
	}

	section #audioControlContainer button img:hover {
		transform: scale(1.1);
	}
</style>
