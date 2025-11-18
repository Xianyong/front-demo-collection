
import {ref, reactive, computed } from 'vue';

export default function(){ 
 
    const userName = ref("王一");
    const salary = ref(15000);

    const userInfo = reactive({
    age: 18,
    sex: "1",
    department: 'dev',
    skills: ['HTML', 'CSS', 'JavaScript'],
    newSkill: ""
    });

    const formattedUserInfo = computed(() => {
    return JSON.stringify(userInfo, null, 2);
    });

    const addSalary = () => {
    try {
        if (typeof salary.value !== 'number' || isNaN(salary.value)) {
        console.error('Invalid salary value');
        return;
        }

        if (salary.value > Number.MAX_SAFE_INTEGER - 1000) {
        console.error('Salary would exceed maximum safe integer value');
        return;
        }

        salary.value += 1000;
    } catch (error) {
        console.error('Error occurred while adding salary:', error);
    }
    };

    const addSkill = () => {
    if (userInfo.newSkill.trim()) {
        userInfo.skills.push(userInfo.newSkill.trim());
        userInfo.newSkill = ""; // Clear input after adding
    }
    };

    // Return the values that will be used in the component
    return {
        userName,
        salary,
        userInfo,
        formattedUserInfo,
        addSalary,
        addSkill
    };
  } 