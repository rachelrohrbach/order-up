import axios from 'axios';

export default {
  getEmployees: function () {
    return axios.get(`/api/employees`);
  },

  getEmployee: function (id) {
    return axios.get(`/api/employees/${ id}`);
  },

  updateEmployee: function (id, data) {
      return axios.put(`/api/employees/${id}`, data);
  },

  deleteEmployee: function (id) {
      return axios.delete(`/api/employees/${ id}`);
  }
};
