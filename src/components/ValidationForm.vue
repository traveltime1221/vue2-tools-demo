<template>
    <div class="row">
      <div
        :class="field.class"
        v-for="(field, key, index) in fields"
        :key="index"
        :data-index="index"
      >
        <div class="form-group text-left mb-2" v-if="field.visible">
          <label :for="key"> {{ field.label }} </label><br />
  
          <!-- 擴充：彈窗-->
          <div v-if="field.type == 'modal'">
            <input type="" v-model="formData[key]" placeholder="" />
            <button
              @click="
                $emit(
                  'openModal',
                  field.setting.modalName,
                  'show',
                  field.setting.data
                )
              "
            >
              開啟彈窗
            </button>
          </div>
  
          <!-- 輸入框 -->
          <input
            v-if="
              field.type === 'text' ||
              field.type === 'email' ||
              field.type === 'tel'
            "
            :type="field.type"
            class="form-control"
            :id="key"
            v-model="formData[key]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :class="{
              'is-invalid': errors[key] && !field.disabled,
              'is-valid': !errors[key] && formData[key] && !field.disabled,
            }"
            @input="onFiledInput(key)"
          />
  
          <!-- 下拉選單 -->
          <div
            v-if="field.type === 'select'"
            class="form-control position-relative p-0"
            :class="{
              select: field.type == 'select',
              'is-invalid': errors[key],
              'is-valid': !errors[key] && formData[key],
            }"
          >
            <!--:class="{ 'is-invalid': errors[key], 'is-valid': !errors[key] && formData[key] }"-->
            <select
              :id="key"
              v-model="formData[key]"
              class="form-control border-0"
              :disabled="field.disabled"
              @change="onFiledInput(key)"
            >
              <option
                v-for="(option, o_index) in field.options"
                :key="o_index"
                :value="
                  field.optionFormat
                    ? field.optionFormat.v
                      ? option[field.optionFormat.v]
                      : option.no
                    : option.no
                "
              >
                <!-- ({{ option.no }}) {{ option.name }} -->
                {{
                  field.optionFormat && field.optionFormat.v == "name"
                    ? option.name
                    : `(${option.no}) ${option.name}`
                }}
              </option>
            </select>
          </div>
  
          <!-- Checkbox -->
          <div v-if="field.type === 'checkbox'" class="d-flex">
            <div
              v-for="(option, c_index) in field.options"
              :key="c_index"
              class="form-check d-flex items-center"
            >
              <!---錯誤--->
              <div class="input-type" role="button">
                <img
                  class="default"
                  :src="icon.checkbox.default"
                  alt=""
                  v-if="
                    formData[key].find((a) => a != option.no) ||
                    formData[key].length == 0
                  "
                />
                <img
                  class="active"
                  :src="icon.checkbox.active"
                  alt=""
                  v-if="formData[key].find((a) => a == option.no)"
                />
                <img
                  class="error"
                  :src="icon.checkbox.error"
                  alt=""
                  v-if="errors[key]"
                />
              </div>
              <input
                hidden
                type="checkbox"
                class="form-check-input"
                :id="key + '-' + option.no"
                :value="option.no"
                v-model="formData[key]"
                @change="onFiledInput(key)"
              />
              <label
                class="form-check-label ml-4 mr-16 mb-0 text-14"
                :for="key + '-' + option.no"
                >{{ option.name }}</label
              >
            </div>
          </div>
  
          <!-- Radio -->
          <div v-if="field.type === 'radio'" class="d-flex">
            <div
              v-for="(option, r_index) in field.options"
              :key="r_index"
              class="form-check d-flex items-center"
            >
              <div class="input-type" role="button" :data-id="option.no">
                <img
                  class="default"
                  :src="icon.radio.default"
                  alt=""
                  v-if="formData[key] == '' || formData[key] != option.no"
                />
                <img
                  class="active"
                  :src="icon.radio.active"
                  alt=""
                  v-if="formData[key] == option.no"
                />
                <img
                  class="error"
                  :src="icon.radio.error"
                  alt=""
                  v-if="errors[key]"
                />
              </div>
              <input
                hidden
                type="radio"
                class="form-check-input"
                :id="key + '-' + option.no"
                :value="option.no"
                :name="key"
                v-model="formData[key]"
                @change="onFiledInput(key)"
              />
              <label
                class="form-check-label ml-4 mr-16 mb-0 text-14"
                :for="key + '-' + option.no"
              >
                {{ option.name }}
              </label>
            </div>
          </div>
  
          <!--- date --->
          <div v-if="field.type === 'date'">
            <date-picker
              :config="field.dpOptions"
              v-model="formData[key]"
              :class="{
                'is-invalid': errors[key],
                'is-valid': !errors[key] && formData[key],
              }"
              @change="onFiledInput(key)"
            >
            </date-picker>
  
            <!-- <date-picker v-model="formData[key]" class="form-control" :class="{'is-invalid': errors[key], 'is-valid': !errors[key] && formData[key]}"
                      :format="field.dpOptions.format" :type="field.dpOptions.type" @change="onFiledInput(key)"></date-picker> -->
          </div>
  
          <div class="invalid-feedback h-20 text-13">{{ errors[key] }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import { onCheckBoxChange } from "../js/utils";
  // import DatePicker from 'vue2-datepicker';
  // import 'vue2-datepicker/index.css';
  import DatePicker from "vue-bootstrap-datetimepicker";
  // import iCheckRedioButton from "@/components/iCheckRedioButton";
  
  export default {
    components: {
      DatePicker,
      // iCheckRedioButton
    },
    props: {
      icon: {
        type: Object,
      },
      fields: {
        type: Object,
      },
      formData: {
        type: Object,
      },
      errors: {
        type: Object,
      },
    },
    methods: {
      onFiledInput(key) {
        this.$emit("validateForm", key);
      },
      onCheckboxChange(key, value) {
        onCheckBoxChange(key, value, this);
      },
    },
  };
  </script>
  
  <style lang="scss">
  .tax-container {
    .mx-datepicker {
      padding: 0px;
      height: 46px !important;
      .mx-input {
        height: 44px !important;
        border: 0 !important;
      }
    }
  }
  </style>
  
  <style lang="scss" scoped>
  //@import "@/assets/scss/them/style_1/app";
  //@include selectStyle("../../../../assets/img/them/style_1/icon-arrow.svg");
  
  .input-type {
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: 0.3s;
      &.default {
        opacity: 1;
        transition: 0.3s;
      }
      &.active {
        opacity: 1;
        transition: 0.3s;
      }
      &.error {
        opacity: 1;
        transition: 0.3s;
      }
    }
  }
  
  label {
    font-size: 16px;
    font-weight: 400;
  }
  
  .form-check {
    max-width: 150px;
    width: 100%;
    font-size: 14px;
    margin-right: 12px;
  }
  </style>
  