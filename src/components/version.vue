<template>
    <button
            class="version"
            @click="toggleSelectedVersion"
            :class="{versionActive: isActive}"
    >
        {{name}}
    </button>
</template>

<script>
    export default {
        name: "version",
        props: {
            name: String,
        },
        computed: {
            isActive() {
                return this.$store.getters.getIsSelectedVersion(this.name);
            }
        },
        methods: {
            toggleSelectedVersion() {
                if (this.isActive) {
                    this.$store.dispatch('deleteSelectedVersion', this.name);
                } else {
                    this.$store.dispatch('addSelectedVersion', this.name);
                }
            },

        }
    }
</script>

<style scoped>
    .version {
        background-color: white;
        border: 3px solid #f28d1a;
        font-size: 11px;
        margin: 3px;
        outline: none;
    }

    .version:hover, .versionActive {
        background-color: #f28d1a;
        color: white;
    }
</style>