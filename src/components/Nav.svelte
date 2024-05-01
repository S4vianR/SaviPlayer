<script lang="ts">
    import {onMount} from "svelte";

    let nombreUsuario: String = "Reuben";
    let mensaje: String;
    onMount(() => {
        // Dependiendo de la hora mostrar un mensaje diferente
        const hora = new Date().getHours();
        if (hora >= 0 && hora < 12) {
            mensaje = "Buenos días";
        } else if (hora >= 12 && hora < 19) {
            mensaje = "Buenas tardes";
        } else {
            mensaje = "Buenas noches";
        }

        // const lightMode = document.querySelector("#lightMode") as HTMLElement;
        // const darkMode = document.querySelector("#darkMode") as HTMLElement;
        // lightMode.style.display = "block";
        // darkMode.style.display = "none";
        // const anchors = document.querySelectorAll("a") as NodeListOf<HTMLElement>;
        // anchors.forEach(anchor => {
        //     anchor.style.color = "#fff";
        //     // Change color on hover
        //     anchor.addEventListener("mouseover", () => {
        //         anchor.style.color = "#000";
        //     });
        //
        //     // Change color on mouseout
        //     anchor.addEventListener("mouseout", () => {
        //         anchor.style.color = "#fff";
        //     });
        // });
    });

    // const handleLightDarkSwitch = () => {
    //     const body = document.querySelector("body") as HTMLElement;
    //     const lightMode = document.querySelector("#lightMode") as HTMLElement;
    //     const darkMode = document.querySelector("#darkMode") as HTMLElement;
    //     const anchors = document.querySelectorAll("a") as NodeListOf<HTMLElement>;
    //     if (body.classList.contains("light")) {
    //         console.log(body.classList);
    //         body.classList.remove("light");
    //         body.classList.add("dark");
    //         anchors.forEach(anchor => {
    //             anchor.style.color = "#fff";
    //             // Change color on hover
    //             anchor.addEventListener("mouseover", () => {
    //                 anchor.style.color = "#000";
    //             });
    //
    //             // Change color on mouseout
    //             anchor.addEventListener("mouseout", () => {
    //                 anchor.style.color = "#fff";
    //             });
    //         });
    //         lightMode.style.display = "block";
    //         darkMode.style.display = "none";
    //     } else if (body.classList.contains("dark")) {
    //         console.log(body.classList);
    //         body.classList.remove("dark");
    //         body.classList.add("light");
    //         anchors.forEach(anchor => {
    //             anchor.style.color = "#000";
    //         });
    //         lightMode.style.display = "none";
    //         darkMode.style.display = "block";
    //     }
    // }
</script>

<nav>
    <div id="mensajeContainer">
        <img src="/SaviLogoV3_1.jpg" alt="SaviLogo" id="logo">
        <h3>{mensaje}</h3>
    </div>
    <div id="linksContainer">
        <ul>
            <li><a href="/">Inicio</a></li>
        </ul>
        <p>{nombreUsuario}</p>
        <!--        <button id="lightDarkSwitch">-->
        <!--            <img id="darkMode" src="/darkMode.svg" alt="darkMode">-->
        <!--            <img id="lightMode" src="/lightMode.svg" alt="lightMode">-->
        <!--        </button>-->
    </div>
</nav>

<style>
    nav {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 10svh;
    }

    nav > #mensajeContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    nav > #mensajeContainer > #logo {
        width: 58px;
        aspect-ratio: 1;
        border-radius: 2rem;
    }

    nav > #mensajeContainer h3 {
        font-size: 1.2rem;
    }

    nav > #linksContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 2rem;
    }

    nav > #linksContainer > ul {
        list-style: none;
    }


    nav > #linksContainer > ul > li a,
    nav > #linksContainer > p {
        font-size: 1.1rem;
        font-weight: 500;
    }

    nav > #linksContainer > ul li > a {
        text-decoration: none;
        color: #fff;
        transition: color 0.5s ease-in-out;
    }

    nav > #linksContainer > ul li > a:hover {
        color: #000;
    }

    nav > #linksContainer > ul li {
        padding: 0.2rem;
        border-radius: 0.2rem;
        transition: background-color 0.5s ease-in-out;
    }

    nav > #linksContainer > ul li:hover {
        background-color: #fff;
    }

    nav > #linksContainer > button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
</style>