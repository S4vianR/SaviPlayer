<script lang="ts">
    import Nav from "../../components/Nav.svelte";
    import {onMount} from "svelte";
    import { supabase } from '$lib/supabaseClient';

    let audio: any;
    let isPlaying = false;
    let currentSongPlaying: string = "Nothing playing...";
    let audioUrl: URL;
    let songUrl: URL;

    onMount(() => {
        if (typeof window !== 'undefined') {
            audio = new Audio();
        }
    });

    let songs = [
        {
            title: "Kadak",
            url: "/music/Drumstep/Kadak.mp3",
            author: "Zack Merci",
        }, {
            title: "On & On",
            url: "/music/Drumstep/On&On.mp3",
            author: "Cartoon",
        },
        {
            title: "Fell For A Demon",
            url: "/music/MelodicDubstep/FellForADemon.mp3",
            author: "Linker"
        }, {
            title: "Spend It All",
            url: "/music/MelodicDubstep/SpendItAll.mp3",
            author: "Guy Arthur"
        }, {
            title: "Stars In The Sky",
            url: "/music/DancePop/StarsInTheSky.mp3",
            author: "BESKY."
        },
        {
            title: "Time With You",
            url: "/music/DancePop/TimeWithYou.mp3",
            author: "RVLE"
        }
    ];

    const handleSongs = (url: string, event: MouseEvent, currentSong: string) => {
        const playPauseButton = (event.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement;
        const allPlayPauseButtons = document.querySelectorAll("#buttonPlay img") as NodeListOf<HTMLImageElement>;
        const playImg = document.getElementById("playImg") as HTMLImageElement;


        if (audio.src) {
            audioUrl = new URL(audio.src);
        }
        songUrl = new URL(url, window.location.href);

        if (audioUrl && isPlaying == true && audioUrl.pathname === songUrl.pathname) {
            // If the same song is clicked while it's playing
            console.log("First if");
            audio.pause();
            playPauseButton.src = "/play.svg";
            playImg.src = "/play.svg";
            isPlaying = false;
            currentSongPlaying = "Nothing playing...";
        } else if (audioUrl && isPlaying == true && audioUrl.pathname !== songUrl.pathname) {
            // If a different song is clicked while another song is playing
            console.log("Second if");
            allPlayPauseButtons.forEach((button) => {
                button.src = "/play.svg";
            });
            audio.src = url;
            audio.play();
            playPauseButton.src = "/pause.svg";
            playImg.src = "/pause.svg";
            isPlaying = true;
            currentSongPlaying = currentSong;
        } else {
            // If no song is playing
            console.log("Third if");
            audio.src = url;
            audio.play();
            playPauseButton.src = "/pause.svg";
            playImg.src = "/pause.svg";
            isPlaying = true;
            currentSongPlaying = currentSong;
        }
    };

    const handleMainMediaControl = (event: MouseEvent) => {
        const playPauseButton = (event.currentTarget as HTMLElement).querySelector('img') as HTMLImageElement;
        const allPlayPauseButtons = document.querySelectorAll("#buttonPlay img") as NodeListOf<HTMLImageElement>;

        if (isPlaying) {
            audio.pause();
            playPauseButton.src = "/play.svg";
            allPlayPauseButtons.forEach((button) => {
                button.src = "/play.svg";
            });
            isPlaying = false;
        } else {
            audio.play();
            playPauseButton.src = "/pause.svg";
            allPlayPauseButtons.forEach((button) => {
                if (new URL(audio.src).pathname === new URL(button.parentElement?.getAttribute('data-url') || '', window.location.href).pathname) {
                    button.src = "/pause.svg";
                }
            });
            isPlaying = true;
        }
    };

    const handleBucket= async () =>{
    try {
        const { data, error } = await supabase
            .storage
            .getBucket('Musica')

        console.log(data)
    } catch (error) {
        console.error(error);
    }
};
</script>

<div id="contentContaniner">
    <Nav/>
    <main>
        <aside>
            <ul>
                <li>
                    <img src="/kadak.jpg" alt="kadak">
                    <a href="/Drumstep">
                        Drumstep
                    </a>
                </li>
                <li>
                    <img src="/fell-for-a-demon.jpg" alt="fell-for-a-demon">
                    <a href="/MelodicDubstep">
                        Melodic Dubstep
                    </a>
                </li>
                <li>
                    <img src="/time-with-you.jpg" alt="time-with-you">
                    <a href="/DancePop">
                        Dance Pop
                    </a>
                </li>
            </ul>
            <button on:click={handleBucket} style="border: 1px solid #fff; color: #000; margin-top: 2rem; padding: 1rem; cursor:pointer;">Log bucket</button>
        </aside>
        <section>
            <div id="songsContainer">
                <h2>Tu música</h2>
                <!-- For each for all the songs in /music/*/* -->
                {#each songs as song}
                    <div>
                        <button on:click={(event) => handleSongs(song.url, event, song.title)} id="buttonPlay"
                                data-url={song.url}>
                            <img src="/play.svg" alt="playButton" height="24" width="24">
                        </button>
                        <p>{song.title} - {song.author}</p>
                    </div>
                {/each}
            </div>
            <div id="audioControlContainer">
                <!-- Audio control play/pause button and show title of the current song playing -->
                <p id="currentSongTitle">{currentSongPlaying}</p>
                <button id="playPauseButton" on:click={(event) => handleMainMediaControl(event)}>
                    <img src="/play.svg" alt="playButton" id="playImg">
                </button>
            </div>
        </section>
    </main>
</div>

<style>
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
        background-color: transparent;
        border: none;
        outline: none;
    }

    section #songsContainer > div > button:hover {
        cursor: pointer;
    }

    section #songsContainer > div > button img {
        transition: transform 0.3s ease-in-out;
    }

    section #songsContainer > div > button img:hover {
        transform: scale(1.1);
    }

    section #audioControlContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: 50%;
        font-size: 1.1rem;
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
