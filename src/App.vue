<template>
    <div id="app">
        <div class="search-wrapper">
            <div class="search">
                <input
                        type="text"
                        class="search-field"
                        placeholder="Search packages..."
                        v-model="search"
                        @keyup.enter="getPackage()"
                >
            </div>
        </div>

        <div class="page">
            <div class="versions">
                <version
                        v-for="(obj, version) in currentPackage.versions"
                        v-bind:key="version"
                        v-bind:name="version"
                ></version>
            </div>

            <table-reqs></table-reqs>
        </div>
    </div>
</template>

<script>
    import ComponentVersion from './components/version'
    import ComponentTableReqs from './components/table-reqs'

    export default {
        name: "App",
        components: {
            'version': ComponentVersion,
            'table-reqs': ComponentTableReqs
        },
        data: function() {
            return {
                search: null
            }
        },
        computed: {
            currentPackage () {
                return this.$store.getters.getPackage;
            },
            selectedVersions () {
                return this.$store.getters.getSelectedVersions;
            }
        },
        methods: {
            getPackage: function (name = null) {
                if (!name) {
                    name = this.search;
                }
                this.$store.dispatch('loadPackage', name);
            }
        },
        beforeMount(){
            this.$store.dispatch('loadPackage', 'symfony/symfony');
        }
    }
</script>

<style scoped>
    @import url('./css/main.css');

    #app {
        min-height: 100%;
        margin: 0 auto -135px;
        padding: 0 0 135px;
        position: relative;
    }

    .page {
        width: 1000px;
        margin: 20px auto;
        padding: 10px;
        /*border: 1px solid black;*/
    }

    .search-wrapper {
        background: #f28d1a;
    }

    .search {
        width: 50%;
        padding: 25px 0;
        margin: 0 auto;
    }

    .search-field {
        background: #FFF;
        font: 18px 'Open Sans', sans-serif;
        border: 0;
        padding: 0px 10px;
        color: #2d2d32;
        outline: none;
        display: inline;
        min-height: 20px;
        box-shadow: none;
        border-radius: 2px;
        width: 100%;
        height: 34px;
    }
</style>