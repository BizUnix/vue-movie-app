<template>
  <!-- Overlay -->
  <v-overlay
    v-model="loading"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>

  <!--  Card Search -->
  <v-card>
    <v-card-item class="row">
      <v-row>
        <v-spacer></v-spacer>
        <!-- Search Text -->
        <v-col cols="12" md="8" align="center">
          <v-text-field
            v-model="searchString"
            clearable
            label="Search movie(s)"
            variant="solo-filled"
            hint="Type the name of Movie you are looking for."
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <!-- Search Button -->
      <v-row>
        <v-col cols="12" md="12" align="center">
          <v-btn
            color="blue"
            size="x-large"
            variant="tonal"
            @click="searchMovies()"
          >Search Movie(s)</v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>

  <!-- Data table -->
  <v-card
    title="Movie Result(s)"
    class="pa-2"
    outlined
    flat
  >
    <v-card-title class="d-flex align-right" >
      <!-- Filter result by text -->
      <v-col cols="12" md="5">
        <v-text-field
          clearable
          v-model="filter"
          density="compact"
          label="Filter Results"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-col>
      <!-- Filter result by Genre -->
      <v-col cols="12" md="5">
        <!-- Genres -->
        <v-select
          clearable
          clear-icon="$mdiDelete"
          density="compact"
          label="Select Genre"
          hint="Filter by a genre"
          :items="genres.value"
          variant="outlined"
          v-model="filter"
          persistent-hint
        ></v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          variant="outlined"
          @click="clearFilters()"
        >
          Clear Filter(s)
        </v-btn>
      </v-col>
    </v-card-title>

    <!-- Data Table -->
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="movies"
      :search="filter || selectedGenre"
      show-expand
    >
      <!-- slot for Poster  -->
      <template  #[`item.posterUrl`]="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`${item.posterUrl}`"
            height="150"
            cover
          ></v-img>
        </v-card>
      </template>
      <!-- Expanded row -->
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            {{ item.summary }}
          </td>
        </tr>
      </template>
      <!-- Pagination -->
      <template v-slot:bottom>
        <div class="text-center">
          <v-pagination
            v-model="currentPage"
            :length="pagination?.totalPages"
            rounded="circle"
            @click="switchTab(currentPage)"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  import { Movies_Query, Genres_Query } from '@/apollo/query'

  var headers = [
   
    {
      title: 'Movie',
      align: 'center',
      sortable: true,
      key: 'title',
    },
    {
        title: 'Poster',
        key: 'posterUrl',
    },
    {
        title: 'Summary',
        key: 'summary',
    },
    {
      title: 'Duration',
      key: 'duration',
      value: item => `${item.duration?.split('PT')[1]?.split('H').join('H, ') ?? item.durationa}`
    },
    {
      title: 'Genres',
      key: 'genres',
      value: item => `${ item.genres.map(u => u.title).join(', ')}`
    },
    { title: 'Published', key: 'datePublished' },
    { title: 'Rating', key: 'rating' },
    { title: '', key: 'data-table-expand' },
  ]

  var error = []
  var loading = false
  var currentPage = ref(1)
  var searchString = ref('')
  var filter = ref('')
  var selectedGenre = ref('')
  // Data variables
  var genres  = ref([])
  var movies = ref([])
  var pagination = ref({
    "page": currentPage,
    "perPage": 15
  } )
  var where = ref({
    "search": "" 
  })
  
  export default {
    name: 'App',
    setup () {
      // Genres Query
      const { result: genresResult } = useQuery(Genres_Query, {
        "pagination": {
          "page": 1,
          "perPage": 25
        }},
      );

      genres.value = computed(() => genresResult?.value?.genres?.nodes ?? [])

      // Movie Query
      // const { result: moviesResult } = useQuery(Movies_Query, { queryVariables } );
      const { loading: dataLoading, result: moviesResult } = useQuery(Movies_Query, {
        "pagination": pagination.value,
        "where": where.value
      });

      loading = dataLoading
      
      movies = computed(() => moviesResult.value?.movies?.nodes ?? [])
      pagination = computed(() => moviesResult.value?.movies?.pagination ?? [])
    },
    data () {
      return {
        headers,
        error,
        loading,
        currentPage: 1,
        genres,
        movies,
        pagination,
        where,
        filter,
        searchString,
        selectedGenre,
      }
    },
    methods: {
      switchTab(page) {
        console.log('Current Page ' + currentPage.value + ' switching to ' + page)
        currentPage.value = page
      },
      searchMovies() {
        currentPage.value = 1
        filter.value = ''
        console.log(searchString.value)
        where.value.search = searchString.value
      },
      clearFilters(){
        console.log(filter.value)
        console.log(selectedGenre.value)
        filter.value = ''
        selectedGenre.value = ''
      }
    }
  }
</script>
