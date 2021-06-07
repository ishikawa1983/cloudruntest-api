<template>
  <div class="hello">
    <div>
      <textarea v-model="inputCode" rows="30" cols="100"></textarea>
    </div>
    <div style="padding:10px;">
      <button v-on:click="sendCode">送信</button>
    </div>
    <div>
      <div>コンパイル結果</div>
      <textarea v-model="output" rows="10" cols="100" readonly></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JavacTest',
  props: {
    msg: String
  },
  data() {
    return {
      inputCode: `import java.util.*;
public class JavaTest {
  public static void main(String[] args){  
    System.out.println("Hello, world!");
    // Javaコードを書いてみよう！

    //List<Integer> integerList = Arrays.asList(1, 2, 3, 4, 5);
    //integerList.stream()
    //  .filter(i -> i % 2 == 0)
    //  .forEach(i -> System.out.println(i));

  }
}
      `
      ,
      output: ""
    }
  },
  methods: {
    sendCode: function () {
      var details = {
          'code': this.inputCode
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('https://javac.ishikawa1983.com/compile', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then((res) => {
        return(res.json());
      }).then((json) => {
        if (json.error) {
          this.output = json.error;
        } else {
          this.output = json.output;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
