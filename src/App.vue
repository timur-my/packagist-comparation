<template>
    <div id="app">
        <div class="head_navbar"></div>
        <div class="search-wrapper">
            <div class="search w-50">
                <v-select
                        placeholder="Search packages..."
                        @search="onSearch"
                        :options="searchOptions"
                        @input="getPackage"
                        @option:selecting="onSelecting"
                />
            </div>
        </div>

        <div class="page w-75">
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
    import vSelect from 'vue-select'
    import _ from 'lodash'

    export default {
        name: "App",
        components: {
            'version': ComponentVersion,
            'table-reqs': ComponentTableReqs,
            'v-select': vSelect
        },
        computed: {
            currentPackage () {
                return this.$store.getters.getPackage;
            },
            searchOptions () {
                return this.$store.getters.getSearchOptions;
            }
        },
        methods: {
            getPackage: function (name = null) {
                if (name) {
                    this.$store.dispatch('loadPackage', name);
                }
            },
            onSearch(search, loading) {
                if (search.length) {
                    loading(true);
                    this.getDebouncePackagesList(loading, search, this);
                }
            },
            getDebouncePackagesList: _.debounce((loading, search, vm) => {
                vm.$store.dispatch('getPackagesList', search)
                    .finally(loading(false))
            }, 350),
            onSelecting: function () {
                this.$store.dispatch('clearTable');
            }
        }
    }
</script>

<style scoped>
    #app {
        min-height: 100%;
        margin: 0 auto -135px;
        padding: 0 0 135px;
        position: relative;
    }

    .page {
        margin: 20px auto;
        padding: 10px;
    }

    .search-wrapper {
        background: #f28d1a;
    }

    .search {
        padding: 25px 0;
        margin: 0 auto;
    }

    .head_navbar {
        left: 0;
        right: 0;
        top: 0;
        min-height: 58px;
        z-index: 15;
        background: #2d2d32;
        position: fixed;
    }
</style>