<script lang="ts">
    import {supabase} from '$lib/supabaseClient';

    let email: string = "";
    let password: string = "";
    let repeatPassword: string = "";
    let name: string = "";

    const handleRegister = async () => {
        if (password !== repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        } else {
            const {data, error} = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                    options: {
                        data: {
                            first_name: name,
                        }
                    }
                }
            )

            if (error) {
                alert("Error al registrar usuario");
            } else {
                alert("Usuario registrado correctamente, favor de confirmar su correo electrónico");
                window.location.href = "/";
            }
        }
    };
</script>

<div id="contentContaniner">
    <nav>
        <img src="/SaviLogoV3_1.jpg" alt="SaviLogo" id="logo" width="64" height="64">
        <h2>Savi Player</h2>
    </nav>
    <main>
        <section>
            <h1>Registro de usuario</h1>
            <form on:submit={handleRegister}>
                <label for="email">Correo:</label>
                <input id="email" type="email" required bind:value={email}>
                <label for="password">Contraseña</label>
                <input id="password" type="password" required bind:value={password}>
                <label for="repeatPassword">Repetir contraseña</label>
                <input id="repeatPassword" type="password" required bind:value={repeatPassword}>
                <label for="username">Nombre:</label>
                <input id="username" type="text" required bind:value={name}>
                <button type="submit">Registrar</button>
            </form>
            <a href="/">Ya tienes una cuenta?</a>
        </section>
    </main>
</div>
<style>
    nav {
        height: 10svh;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
    }

    nav > #logo {
        border-radius: 2rem;
    }

    main {
        height: 90svh;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    section {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 40%;
        border: 1px solid #fff;
    }

    section h1 {
        font-size: 2rem;
        font-weight: 600;
        text-decoration: none;
        color: #fff;
    }

    section a {
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        color: #fff;
    }

    section form {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    section label {
        font-size: 1.1rem;
        font-weight: 600;
        text-decoration: none;
        color: #fff;
    }

    section input {
        padding: 0.5rem;
        border-radius: 0.375rem;
        border: 1px solid #fff;
    }

    section input[type="email"],
    section input[type="password"] {
        font-size: 1rem;
        font-weight: 500;
        width: 50%;
    }

    section button {
        background-color: #fff;
        color: #000;
        font-size: 1rem;
        border: none;
        font-weight: 600;
        padding: 0.5rem;
        border-radius: 0.375rem;
        width: 10rem;
        height: 3rem;
        border-bottom: 5px solid rgba(0, 160, 255, 1);
        border-top: 5px solid #68e551;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border 0.3s ease-in-out;
    }

    section button:hover {
        background-color: #2b2b2b;
        color: #fff;
        border-bottom-color: rgba(240, 153, 74, 1);
        border-top-color: rgba(110,38,110);
        cursor: pointer;
    }
</style>