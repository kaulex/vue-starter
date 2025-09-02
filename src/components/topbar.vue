< <template>
    <nav class="topbar">
        <div class="logo">SW3000</div>
        <ul class="nav-links">
            <li><a href="/">Admin</a></li>
        </ul>
    </nav>
</template>

    <script setup lang="ts">

</script>

    <style scoped>
    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #3a3939;
    }

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #c4c3c3;
    }

    .nav-links {
        display: flex;
        list-style: none;
    }

    .nav-links li {
        margin-left: 1rem;
    }

    .nav-links a {
        text-decoration: none;
        color: #c4c3c3;
    }
</style>