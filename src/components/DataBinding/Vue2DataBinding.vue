<template>
    <div>
    姓名： <input v-model="userName" /> {{ userName }} <br />
    薪⽔： <input type="number" v-model="salary" /> {{ salary }}<br />
    <button @click="addSalary">薪⽔加1000</button> 
    </div>
</template>

<script lang="ts">
    export default{
        // Data
        data() {
          return {
            userName: "王一",
            salary: 15000
          }
        },
        //⽅法
        methods:{
            addSalary(){
            try {
                // Validate that salary is a number
                if (typeof this.salary !== 'number' || isNaN(this.salary)) {
                console.error('Invalid salary value');
                return;
                }
                
                // Check for potential overflow (JavaScript safe integer limit)
                if (this.salary > 1e6 - 1000) {
                console.error('Salary would exceed maximum safe integer value');
                return;
                }
                
                this.salary += 1000;
            } catch (error) {
                console.error('Error occurred while adding salary:', error);
            }
            }
        }
    }
</script>
<style scoped>
</style>