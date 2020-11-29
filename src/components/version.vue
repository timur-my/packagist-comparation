<template>
    <button
            class="version"
            @click="toggleSelectedVersion(name)"
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
        data: function () {
            return {
                isActive: false
            }
        },
        computed: {
            selectedVersions () {
                return this.$store.getters.getSelectedVersions;
            }
        },
        methods: {
            toggleSelectedVersion: function (version) {
                let index = this.selectedVersions.indexOf(version);
                if (index !== -1) {
                    this.$store.dispatch('deleteSelectedVersion', version);
                    this.isActive = false;
                } else {
                    this.$store.dispatch('addSelectedVersion', version);
                    this.isActive = true;
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