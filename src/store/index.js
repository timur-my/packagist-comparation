import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        package: {},
        selectedVersions: [],
        requirements: [],
        searchOptions: []
    },
    getters: {
        getPackage: state => state.package,
        getSelectedVersions: state => state.selectedVersions,
        getRequirements: state => state.requirements,
        getSearchOptions: state => state.searchOptions
    },
    mutations: {
        setPackage (state, obj) {
            Vue.set(state, 'package', obj);
        },

        addSelectedVersion (state, version) {
            state.selectedVersions.push(version);
        },
        deleteSelectedVersion (state, version) {
            let index = state.selectedVersions.indexOf(version);
            if (index !== -1) {
                state.selectedVersions.splice(index, 1);
            }
        },
        setSelectedVersion (state, val) {
            state.selectedVersions = val;
        },

        setRequirements (state, val) {
            state.requirements = val;
        },
        fillRequirements (state) {
            let requirements = {};

            let defaultVersionsObj = {};
            for (let version1 of state.selectedVersions) {
                defaultVersionsObj[version1] = null;
            }

            for (let version of state.selectedVersions) {
                let require = state.package.versions[version].require;

                if (!require) continue;

                for (const [requireKey, requireVersion] of Object.entries(require)) {
                    if (!requirements[requireKey]) {
                        requirements[requireKey] = {
                            name: requireKey,
                            versions: Object.assign({}, defaultVersionsObj)
                        };
                    }
                    requirements[requireKey].versions[version] = requireVersion;
                }
            }

            state.requirements = Object.values(requirements);
        },

        setSearchOptions (state, options) {
            state.searchOptions = options;
        }
    },
    actions: {
        loadPackage ({ commit }, name) {
            axios
                .get('https://packagist.org/packages/'+name+'.json')
                .then(response => {
                    commit('setPackage', response.data.package);
                })
                .catch(error => console.log(error))
        },
        getPackagesList ({ commit }, search) {
            return axios
                .get(`https://packagist.org/search.json?q=${escape(search)}`)
                .then(response => {
                    let items = response.data.results,
                        result = [];

                    for (const item of items) {
                        result.push(item['name']);
                    }

                    commit('setSearchOptions', result);
                })
                .catch(error => console.log(error))
        },

        addSelectedVersion ({ commit }, version) {
            commit('addSelectedVersion', version);
            commit('fillRequirements');
        },
        deleteSelectedVersion({ commit }, version) {
            commit('deleteSelectedVersion', version);
            commit('fillRequirements');
        },

        clearTable({ commit }) {
            commit('setSelectedVersion', []);
            commit('setRequirements', []);
        }
    }
})