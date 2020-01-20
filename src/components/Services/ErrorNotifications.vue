<template>
  <div class="container1">
    <div class="input-group mb-3 search-container">
      <input type="text" class="form-control" placeholder="Search" v-model="searchTerm" />
      <div class="input-group-append">
        <button class="btn btn-success" type="submit">Search</button>
        <!-- <button class="btn btn-success" type="submit" v-on:click="searchError">Search</button> -->
      </div>
    </div>

    <table class="table-fill">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" v-bind:key="item.id">
          <td data-head="Id">{{item.id}}</td>
          <td data-head="Name">{{item.address}}</td>
          <td data-head="Address">{{item.address}}</td>
          <td data-head="Email">{{item.email}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
//import qs from "qs";

export default {
  name: "Notification",
  data() {
    return {
      items: [],
      searchTerm: ""
    };
  },

  mounted() {
    // axios
    //   .get("http://.../")
    //   .then(res => {
    //     res.data.map(item => {
    //       this.items.push({
    //         device_imei: item.device_imei,
    //         device_id: item.device_id,
    //         device_name: item.device_name,
    //         device_address: item.device_address,
    //         error_id: item.error_id,
    //         error_name: item.error_name
    //       });
    //     });
    //   });

    axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
      res.data.map(item => {
        this.items.push({
          id: item.id,
          name: item.name,
          address: item.address.street,
          email: item.email
        });
      });
    });
  },

  methods: {
    // searchError() {
    //   const body = qs.stringify({
    //     q: this.searchTerm
    //   });
    //   axios
    //     .get(`http://.../?${body}`)
    //     .then(res => {
    //       this.items = [];
    //       res.data.map(item => {
    //         this.items.push({
    //           device_imei: item.device_imei,
    //           device_id: item.device_id,
    //           device_name: item.device_name,
    //           device_address: item.device_address,
    //           error_id: item.error_id,
    //           error_name: item.error_name
    //         });
    //       });
    //     });
    // }
  }
};
</script>

 <style>
/*** Table Styles **/
.container1 {
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.search-container {
  margin-top: 50px;
  max-width: 800px;
}

.form-control:focus {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}

.table-fill {
  border-radius: 3px;
  border-collapse: collapse;
  height: 320px;
  margin: 20px;
  max-width: 800px;
  padding: 5px;
  width: 100%;
  animation: float 5s infinite;
  -webkit-box-shadow: 0 5px 10px #fb8c00;
  box-shadow: 0 5px 10px #fb8c00;
}

.table-fill th {
  color: #fff;
  background: #fb8c00;
  font-size: 23px;
  padding: 24px;
  text-align: left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}

.table-fill th:first-child {
  border-top-left-radius: 3px;
}

.table-fill th:last-child {
  border-top-right-radius: 3px;
  border-right: none;
}

.table-fill tr {
  border-top: 1px solid rgba(128, 128, 128, 0.12);
  border-bottom: 1px solid rgba(128, 128, 128, 0.12);
  color: #666b85;
  font-size: 16px;
  font-weight: normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}

.table-fill tr:first-child {
  border-top: none;
}

.table-fill tr:last-child {
  border-bottom: none;
}

.table-fill tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

.table-fill tr:last-child td:last-child {
  border-bottom-right-radius: 3px;
}

.table-fill td {
  padding: 20px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
}

.table-fill td:last-child {
  border-right: 0px;
}

@media screen and (max-width: 582px) {
  .table-fill th {
    font-size: 18px;
  }
  .table-fill tr,
  .table-fill td {
    font-size: 16px;
    padding: 10px;
  }
}
</style>