<template>
    <!-- Tangible Person Create -->
    <div>
        <h3 class="md-display-1" style="margin:15px 0;">New Person</h3>
        <form novalidate  @submit.prevent="validateUser">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-field :class="getValidationClass('id')">
                        <label>ID</label>
                        <md-input v-model="form.id" type="text" required></md-input>
                        <span class="md-error">Please enter an ID</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-field :class="getValidationClass('name')">
                        <label>Name</label>
                        <md-input v-model="form.name" type="text" required></md-input>
                        <span class="md-error">Please enter the name</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-field :class="getValidationClass('twitter')">
                        <label>Twitter</label>
                        <md-input v-model="form.twitter" type="text" required></md-input>
                        <span class="md-error">Please enter a valid twitter URL</span>
                    </md-field>
                </div>
            </div>


            <div class="md-layout md-gutter">
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-field :class="getValidationClass('email')">
                        <label>Email</label>
                        <md-input v-model="form.email" type="email" required></md-input>
                        <span class="md-error">Please enter a valid email</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-field :class="getValidationClass('detectable')">
                        <md-select v-model="form.detectable" placeholder="Detectable">
                            <md-option value="australia">Australia</md-option>
                            <md-option value="brazil">Brazil</md-option>
                            <md-option value="japan">Japan</md-option>
                            <md-option value="united-states">United States</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Save Person</md-button>
        </form>
    </div>

</template>

<script>

    import { validationMixin } from 'vuelidate'
    import {
            required,
            email,
            minLength,
            maxLength
    } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        mounted() {
            console.log('Tangible Person Create Mounted.')
        },
        methods: {
            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            savePerson: function () {
                this.sending = true
                window.setTimeout(() => {
                    swal("Good job!", "You clicked the button!", "success")
                    this.$emit('saved', {text: this.form.name,id:0})
                    this.sending = false
                    this.clearForm ()
                }, 1500)
            },

            clearForm () {
                this.$v.$reset()
                this.form =  {
                    id: null,
                    name: null,
                    twitter: null,
                    persona: null,
                    email: null,
                    detectable: null
                };
            },

            validateUser () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.savePerson()
                }
            },

            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
        },
        data: function () {
            return {
                form: {
                    id: '',
                    name: '',
                    twitter: '',
                    persona: '',
                    email: '',
                    detectable: ''
                },
                sending: false
            }
        },
        validations: {
            form: {
                id: {
                    required
                },
                name: {
                    required
                },
                twitter: {
                    required
                },
                detectable: {
                    required
                },
                email: {
                    required,
                    email
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>
