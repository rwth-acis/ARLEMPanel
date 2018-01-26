<template>
    <!-- Entity Create -->
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-20">
            <tabs :component="component" :display="display" @changeTab='tabChange'></tabs>
        </div>
        <div class="md-layout-item md-size-60">
            <keep-alive><component :is="component" @saved="savedEntity"></component></keep-alive>
        </div>
        <div class="md-layout-item">
            <div v-for="item in items">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            'tabs': require('./Tabs.vue'),
            'tab-contents': require('./TabComponents.vue'),

            'workplace-create': require('./workplaces/WorkplaceCreate.vue'),
            'person-create': require('./entities/tangibles/PersonCreate.vue'),
            'place-create': require('./entities/tangibles/PlaceCreate.vue'),
            'thing-create': require('./entities/tangibles/ThingCreate.vue'),
            'app-create': require('./entities/configurables/AppCreate.vue'),
            'device-create': require('./entities/configurables/DeviceCreate.vue'),
            'detectable-create': require('./entities/triggers/DetectableCreate.vue'),
            'detectable-create': require('./entities/triggers/DetectableCreate.vue'),
            'predicate-create': require('./entities/triggers/PredicateCreate.vue'),
            'hazard-create': require('./entities/triggers/WarningHazardCreate.vue'),
            'warning-create': require('./entities/triggers/WarningHazardCreate.vue')
        },
        props: ['display','component'],
        mounted() {
            console.log("Entity create form loaded within '" + display + "' section")
        },
        data :function () {
            return {
                items: []
            }
        },
        methods: {
            tabChange: function(_component){
                this.component = _component
            },
            savedEntity: function(_entity){
                this.items.push(_entity)
            }
        }
    }
</script>