<template>
    <div>
        <div class="container">
            <Form
                :fields="fields"
                :formData="formData"
                :errors="errors"
                @validateForm="validateForm"
                @openModal="openModal"
            />
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 表單
            fields: {},
            formData: {},
            errors: {},
        }
    },
    components: {
        Form
    },
    methods: {
    init() {
      console.log("編輯所得人");
      try {
        this.fields = {
          姓名: {
            type: "text",
            label: "姓名",
            placeholder: "請輸入所得人姓名",
            class: "col-xs-12 ",
            disabled: false,
            required: true,
            visible: true,
          },
          電話: {
            type: "text",
            label: "電話",
            placeholder: "請輸入電話",
            class: "col-xs-12 ",
            disabled: false,
            required: true,
            visible: true,
          },
          選擇類別: {
            type: "modal",
            setting: {
              modalName: "TestModal",
              data: [
                {
                  id: "01",
                  name: "AAA",
                  code: "p1234566",
                },
                {
                  id: "02",
                  name: "bbb",
                  code: "p22222222",
                },
              ],
            },
            label: "選擇類別",
            placeholder: "選擇類別",
            class: "col-xs-12 ",
            disabled: false,
            required: true,
            visible: true,
          },
        };

        // this.fields.申報單位統一編號.options = this.menu.申報單位;

        this.formData = {
          姓名: "",
          電話: "",
          選擇類別: "",
        };

        this.isEdit = false;
        this.errors = {};
        // this.isFirstLoad = true
      } catch (e) {
        console.error(`初始化異常: ${e}`);
      }
    },
    validateForm(key) {
      this.isDataChange = true;
      try {
        const value = this.formData[key];
        const field = this.fields[key];
        const isValidEmail = (email) => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(email);
        };

        if (
          field.required &&
          (value === null ||
            value === undefined ||
            value === "" ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === "string" && value.trim() === ""))
        ) {
          this.errors[key] =
            field.type === "select" ||
            field.type === "checkbox" ||
            field.type === "radio"
              ? `${field.label} 為必選項目`
              : `${field.label} 為必填項目`;
        } else if (field.type === "email" && !isValidEmail(value)) {
          this.errors[key] = "請輸入有效的電子郵件地址";
        } else {
          // 清除欄位的錯誤
          this.$delete(this.errors, key);
        }
      } catch (e) {
        console.error(`驗證欄位異常: ${e}`);
      }
    },
    }
}
</script>