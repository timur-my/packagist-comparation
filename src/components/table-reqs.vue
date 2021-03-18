<template>
    <div v-if="requirements.length > 0">
        <md-table v-model="requirements" md-card>
            <md-table-toolbar>
                <h1 class="md-title">Comparation:</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell
                        v-for="(versionRequire, versionPackage) in item.versions"
                        :key="versionPackage"
                        :md-label="versionPackage"
                >
                    {{ versionRequire }}
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    export default {
        name: "table-reqs",
        computed: {
            requirements () {
                return this.$store.getters.getRequirements;
            }
        }
    }
</script>