<template>
  <div class="container1">
    <div class="input-group mb-3 search-container">
      <input type="text" class="form-control" placeholder="Search" v-model="searchTerm" />
      <div class="input-group-append">
        <button class="btn btn-success" type="submit" v-on:click="searchError">Search</button>
      </div>
    </div>
    <table id="firstTable" class="table-fill">
      <thead>
        <tr>
          <th>Cihazın adı</th>
          <th>Ünvan</th>
          <th>Motorlar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items" v-bind:key="item.device_id">
          <td data-head="Cihazın adı">{{item.device_name}}</td>
          <td data-head="Ünvan">{{item.device_address}}</td>
          <td>
            <div class="buttons-field">
              <button class="arrow-button" @click="sendData(index,action='up')">
                <span class="arrow-up"></span>
              </button>
              <button class="arrow-button" @click="sendData(index,action='down')">
                <span class="arrow-down"></span>
              </button>
              <button class="stop-button" @click="sendData(index,action='stop')">
                <span class="stop">stop</span>
              </button>
            </div>
          </td>
        </tr>
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
      searchTerm: ""
    };
  },

  methods: {
    sendData(index, action) {
      this.myData = this.items.slice(index, index + 1);
      let id = this.myData[0].device_id;
      this.myData[0].action = action;

      const body = qs.stringify({
        up_down: this.myData[0].action
      });
      axios.get(`http://.../${id}/?${body}`).then(res => res);
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
            device_address: item.device_address,
            device_imei: item.device_imei,
            device_name: item.device_name,
            device_id: item.device_id
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
            device_address: item.device_address,
            device_imei: item.device_imei,
            device_name: item.device_name,
            device_id: item.device_id
          });
        });
      })
      .catch(err => this.errors.push(err));
  }
};
</script>

 <style>
.buttons-field {
  display: flex;
}
.arrow-button,
.stop-button {
  margin: 1em auto;
  text-align: center;
  background-color: #eee;
  padding: 0.5em;
  display: block;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.2s;
  box-shadow: 1px 1px 5px 0px rgba(50, 50, 50, 0.6);
  border-radius: 8px;
}

.arrow-button:not(:first-child) {
  margin-left: 0.9em;
  margin-right: 0.9em;
}
.arrow-button:hover,
.stop-button:hover {
  color: #eee;
  background-color: #333;
}

.arrow-button:focus,
.stop-button:focus {
  outline: none;
}

.arrow-down:after {
  content: "▼";
}

.arrow-up:after {
  content: "▲";
}
</style>