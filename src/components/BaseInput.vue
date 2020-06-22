<template>
    <div class='field'>
        <label v-if="label">{{ label }}</label>
        <input 
            :value="value"
            @input="updateValue" 
            type="text" 
            placeholder="Add an event title"
        />
    </div>
</template>

<script>
export default {
    props :{
        label: String,
        value: [String, Number]
    },
    methods:{
        updateValue(event){
            this.$emit('input', event.target.value)
        }
    }
}
</script>