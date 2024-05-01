<div id="contentContaniner">
    <nav>
        <img src="/SaviLogoV3_1.jpg" alt="SaviLogo" id="logo" width="64" height="64">
        <h2>Savi Player</h2>
    </nav>
    <main>
        <section>
            <h1>Inicio de sesión</h1>
            <form>
                <label for="username">Usuario:</label>
                <input id="username" type="text" required>
                <label for="password">Contraseña</label>
                <input id="password" type="password" required>
                <button type="submit">Iniciar sesión</button>
            </form>
            <a href="/Registro">No tienes una cuenta?</a>
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

    section input[type="text"],
    section input[type="password"] {
        font-size: 1rem;
        font-weight: 500;
        width: 50%;
    }

    section button {
        background-color: #fff;
        color: #000;
        border: none;
        font-weight: 600;
        padding: 0.5rem;
        border-radius: 0.375rem;
        width: 7rem;
        height: 2.5rem;
        border-bottom: 2px solid rgba(0, 160, 255, 1);
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border 0.3s ease-in-out;
    }

    section button:hover {
        background-color: #000;
        color: #fff;
        border-color: #f0994a;
        border-color: rgba(240, 153, 74, 1);
        cursor: pointer;
    }
</style>