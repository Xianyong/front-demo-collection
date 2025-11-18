<template>
  <div class="data-binding-container">
    <div class="form-section">
      <h2>Employee Information</h2>
      <div class="form-group">
        <label for="username">姓名 (Name):</label>
        <input id="username" v-model="userName" class="form-control" />
        <span class="display-value">{{ userName }}</span>
      </div>
      
      <div class="form-group">
        <label for="salary">薪⽔ (Salary):</label>
        <input id="salary" type="number" v-model.number="salary" class="form-control" />
        <span class="display-value">{{ salary }}</span>
      </div>
      
      <button @click="addSalary" class="btn btn-primary">薪⽔加1000 (Add 1000 to Salary)</button>
    </div>
    
    <hr class="divider" />
    
    <div class="form-section">
      <h2>个人信息 (Personal Information)</h2>
      
      <div class="form-group">
        <label for="age">年龄 (Age):</label>
        <input id="age" type="number" v-model.number="userInfo.age" class="form-control" />
      </div>
      
      <div class="form-group">
        <label class="radio-label">性别 (Gender):</label>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" value="1" v-model="userInfo.sex" />
            男 (Male)
          </label>
          <label class="radio-option">
            <input type="radio" value="2" v-model="userInfo.sex" />
            女 (Female)
          </label>
        </div>
      </div>
      
      <div class="form-group">
        <label for="department">岗位 (Department):</label>
        <select id="department" v-model="userInfo.department" class="form-control">
          <option value="dev">开发 (Development)</option>
          <option value="test">测试 (Testing)</option>
          <option value="maintain">运维 (Maintenance)</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>技术 (Skills):</label>
        <div class="skills-display">
          <span v-for="skill in userInfo.skills" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="form-group">
        <label>添加新技术 (New Skills):</label>
        <input type="text" v-model="userInfo.newSkill" class="form-control"></input> 
        <button @click="addSkill" class="btn btn-primary">添加</button>
      </div>
      
      <div class="info-summary">
        <h3>个人信息汇总 (Summary):</h3>
        <pre>{{ formattedUserInfo }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Vue3DataBinding1 from '@/components/DataBinding/Vue3DataBinding1'

  let {
    userName,
    salary,
    userInfo,
    formattedUserInfo,
    addSalary,
    addSkill
  } = Vue3DataBinding1();
</script>

<style scoped>
.data-binding-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-section {
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.form-section h2 {
  color: #333;
  margin-top: 0;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.radio-label {
  margin-bottom: 10px;
}

.form-control {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.display-value {
  margin-top: 5px;
  padding: 8px;
  background-color: #f0f9eb;
  border: 1px solid #c2e7b0;
  border-radius: 4px;
  color: #67c23a;
  font-weight: bold;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: white;
}

.btn-primary:hover {
  background-color: #66b1ff;
}

.divider {
  margin: 20px 0;
  border: 0;
  height: 1px;
  background-color: #ebeef5;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.radio-option input {
  width: auto;
}

.skills-display {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background-color: #ecf5ff;
  color: #409eff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
}

.info-summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f2f5;
  border-radius: 4px;
}

.info-summary pre {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  color: #333;
  font-family: 'Courier New', monospace;
}
</style>