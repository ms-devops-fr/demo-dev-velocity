const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
    deleted: null
  },
  methods: {
    async createUrl() {
      this.error = '';
      const response = await fetch('api/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.formVisible = false;
        this.created = `${ window.location.href}/api/${result.slug}`;
      } else if (response.status === 429) {
        this.error = 'You are sending too many requests. Try again in 30 seconds.';
      } else {
        const result = await response.json();
        this.error = result.message;
      }
    },
    async deleteUrl(){
      this.error = '';
      const response = await fetch(`api/${this.slug}`,{
        method: 'DELETE'
      });
      
      if(response.ok) {
        console.log(this.slug)
        this.formVisible = false;
        this.deleted = `${this.slug}`;
      } else {
        const result = response.json();
        this.error = result.message;
      }
    }
  },
});
