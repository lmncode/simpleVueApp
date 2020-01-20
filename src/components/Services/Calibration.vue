<template>
  <div class="container1">
    <template v-if="successBox===true">
      <div class="success box">Success</div>
    </template>
    <template v-if="errorBox===true">
      <div class="success box">Error</div>
    </template>
    <div class="input-group mb-3 search-container">
      <input type="text" class="form-control" placeholder="Search" v-model="searchTerm" />
      <div class="input-group-append">
        <button class="btn btn-success" type="submit" v-on:click="searchError">Search</button>
      </div>
    </div>
    <table id="firstTable" class="table-fill table-calib">
      <thead>
        <tr>
          <th>Cihazın adı</th>
          <th>Ünvan</th>
          <th>Reklam</th>
          <th>Kalibrasiya ölçüsü</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="items && items.length">
        <tr v-for="(item,index) in items" v-bind:key="index">
          <td data-head="Cihazın adı">{{item.device_name}}</td>
          <td data-head="Ünvan">{{item.device_address}}</td>
          <td data-head="Reklam">
            <div class="selectdiv">
              <select v-model="item.selected">
                <option
                  v-for="advert in item.adverts"
                  v-bind:key="advert.num"
                >{{advert.num}} {{advert.advert}}</option>
              </select>
            </div>
          </td>
          <td data-head="Kalibr ölçüsü">
            <input type="number" step="1" value="0" min="-10" max="10" v-model="item.number" />
          </td>
          <td>
            <button
              v-bind:disabled=" item.selected === ''|| item.number === ''"
              class="send-btn"
              type="submit"
              @click="sendData(index)"
            >Kalibrləmə et</button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="errors && errors.length">
        <tr v-for="error in errors" v-bind:key="error + 1">{{error.message}}</tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "Calibration",
  data() {
    return {
      items: [],
      errors: [],
      myData: {},
      errorBox: false,
      successBox: false,
      searchTerm: ""
    };
  },

  methods: {
    sendData(index) {
      this.myData = this.items.slice(index, index + 1);
      let id = this.myData[0].device_id;

      const body = qs.stringify({
        ad_number: this.myData[0].selected.split(" ")[0],
        how_many: this.myData[0].number
      });

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      axios
        .get(`http://.../${id}/?${body}`, config)
        .then(res => {
          if (res.data.status == "error") {
            this.errorBox = true;
            setTimeout(() => {
              this.errorBox = false;
            }, 1000);
          } else if (res.status == 200) {
            this.successBox = true;
            setTimeout(() => {
              this.successBox = false;
            }, 1000);
          }
        })
        .catch(error => error);
    },

    //Search
    searchError() {
      const body = qs.stringify({
        q: this.searchTerm
      });

      axios.get(`http://.../?${body}`).then(res => {
        this.items = [];

        res.data.map(item => {
          this.items.push({
            selected: "",
            number: "",
            device_address: item.device_address,
            device_imei: item.device_imei,
            device_id: item.device_id,
            device_name: item.device_name,
            adverts: item.adverts
          });
        });
      });
    }
  },

  created: function() {
    axios
      .get("http://.../")
      .then(res => {
        res.data.map(item => {
          this.items.push({
            selected: "",
            number: "",
            device_address: item.device_address,
            device_imei: item.device_imei,
            device_id: item.device_id,
            device_name: item.device_name,
            adverts: item.adverts
          });
        });
      })
      .catch(err => this.errors.push(err));
  }
};
</script>

 <style>
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 100px;
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-weight: bold;
  border-radius: 10px;
  z-index: 99999;
}

.success {
  background-color: #b9ffab;
  border-color: #116400;
  color: #116400;
}

.error {
  background-color: #ebb1b1;
  border-color: #973939;
  color: #973939;
}

@media (min-width: 768px) and (max-width: 880px) {
  .table-calib td {
    padding: 10px !important;
  }
}

@media (max-width: 767px) {
  .table-fill {
    box-shadow: none;
  }
  .selectdiv select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    max-width: 320px;
    height: 50px;
    margin: 5px 0px;
    padding: 0px 24px;
    font-size: 16px;
    line-height: 1.75;
    color: #666b85;
    background-color: #ffffff;
    background-image: none;
    border: 1px solid #cccccc;
    -ms-word-break: normal;
    word-break: normal;
  }

  .selectdiv {
    position: relative;
    width: 100%;
    max-width: 320px;
  }

  select::-ms-expand {
    display: none;
  }

  select:focus {
    outline: none;
  }

  input[type="number"] {
    width: 100%;
    max-width: 54px;
    height: 50px;
    color: #666b85;
    font-size: 20px;
    padding: 0;
    margin: 0;
    padding-left: 10px;
    border: 1px solid #cccccc;
  }

  input[type="number"]:focus {
    outline: none;
  }

  table {
    border: none;
    box-shadow: none;
  }

  table,
  caption,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead {
    display: none;
  }

  tbody tr {
    box-shadow: 0 5px 10px #fb8c00;
  }
  tbody tr + tr {
    margin-top: 10px;
  }

  tbody tr td {
    border: none;
  }

  tbody tr td + td {
    border-top: 1px solid #dddddd;
    border-left: none;
  }

  tbody tr td:before {
    font-size: 1.2em;
    font-weight: bold;
    display: block;
    content: attr(data-head);
    color: #111;
    margin-bottom: 10px;
  }
}

.selectdiv select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 200px;
  max-width: 200px;
  height: 50px;
  margin: 5px 0px;
  padding: 0px 24px;
  font-size: 16px;
  line-height: 1.75;
  color: #666b85;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  -ms-word-break: normal;
  word-break: normal;
}

.selectdiv {
  position: relative;
  min-width: 200px;
}

select::-ms-expand {
  display: none;
}

select:focus {
  outline: none;
}

input[type="number"] {
  width: 100%;
  height: 50px;
  color: #666b85;
  font-size: 20px;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  border: 1px solid #cccccc;
}

input[type="number"]:focus {
  outline: none;
}

.send-btn {
  margin: 1em 0;
  text-align: center;
  background-color: #eee;
  padding: 0.5em;
  display: block;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 1px 1px 5px 0px rgba(50, 50, 50, 0.6);
  border-radius: 8px;
}

.send-btn:disabled {
  background: #999;
  color: #fff;
}
.send-btn:disabled:hover {
  background: #999;
}
.send-btn:hover {
  background-color: #333;
  color: #fff;
}

.send-btn:focus {
  outline: none;
}
</style>