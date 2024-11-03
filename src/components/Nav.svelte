<script lang="ts">
	import { onMount, beforeUpdate } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	let userName: string = '';
	let mensaje: String;
	onMount(() => {
		handleGetUserName();
		// Dependiendo de la hora mostrar un mensaje diferente
		const hora = new Date().getHours();
		if (hora >= 0 && hora < 12) {
			mensaje = 'Buenos días' + userName;
		} else if (hora >= 12 && hora < 19) {
			mensaje = 'Buenas tardes' + userName;
		} else {
			mensaje = 'Buenas noches' + userName;
		}
	});

	// Function to get the user's name
	const handleGetUserName = async () => {
		const { data, error } = await supabase.auth.getUserIdentities();

		if (error) {
			console.error(error);
		} else {
			userName = data?.identities[0].identity_data?.name;
		}
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		window.location.href = '/';
	};
</script>

<nav>
	<div id="mensajeContainer">
		<img src="/SaviLogoV3_1.jpg" alt="SaviLogo" id="logo" />
		<h3>{mensaje}</h3>
	</div>
	<div id="linksContainer">
		<ul>
			<li><a href="/Player">Inicio</a></li>
		</ul>
		<p>{userName}</p>
		<button id="cerrarSesion" on:click={handleSignOut}>Cerrar sesión</button>
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

	nav #cerrarSesion {
		font-size: 1.1rem;
		font-weight: 500;
		color: #fff;
		background-color: rgba(255, 255, 255, 0);
		padding: 0.2rem;
		border-radius: 0.2rem;
		transition:
			color 0.5s ease-in-out,
			background-color 0.5s ease-in-out;
	}

	nav #cerrarSesion:hover {
		background-color: rgba(255, 255, 255, 1);
		color: #000;
	}
</style>
