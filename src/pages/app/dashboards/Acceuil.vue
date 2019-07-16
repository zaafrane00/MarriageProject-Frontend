<template>
  <div>
    <div>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Acceuil" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <div class="icon-cards-row">
            <icon-card title="Utilisateurs" icon="iconsmind-MaleFemale" :value="32" />
          </div>
        </b-col>
        <b-col>
          <div class="icon-cards-row">
            <icon-card title="Prestataires" icon="iconsmind-Engineering" :value="32" />
          </div>
        </b-col>
        <b-col>
          <div class="icon-cards-row">
            <icon-card title="Marriages" icon="simple-icon-event" :value="32" />
          </div>
        </b-col>
        <b-col>
          <div class="icon-cards-row">
            <icon-card title="Reservation" icon="iconsmind-Basket-Coins" :value="32" />
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-colxx sm="12" md="6" class="mb-4">
          <b-card class="dashboard-filled-line-chart" no-body>
            <b-card-body>
              <div class="float-left float-none-xs">
                <div class="d-inline-block">
                  <h5 class="d-inline">{{ $t('dashboards.website-visits') }}</h5>
                  <span class="text-muted text-small d-block">{{ $t('dashboards.unique-visitors') }}</span>
                </div>
              </div>
              <b-dropdown
                id="ddown5"
                :text="$t('dashboards.this-week')"
                size="xs"
                variant="outline-primary"
                class="float-right float-none-xs mt-2"
              >
                <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
                <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
              </b-dropdown>
            </b-card-body>
            <div class="chart card-body pt-0">
              <area-shadow-chart :data="areaChartData" :height="195" />
            </div>
          </b-card>
        </b-colxx>
        <b-colxx sm="12" md="6" class="mb-4">
          <b-card class="dashboard-filled-line-chart" no-body>
            <b-card-body>
              <div class="float-left float-none-xs">
                <div class="d-inline-block">
                  <h5 class="d-inline">{{ $t('dashboards.conversion-rates') }}</h5>
                  <span class="text-muted text-small d-block">{{ $t('dashboards.per-session') }}</span>
                </div>
              </div>
              <b-dropdown
                id="ddown5"
                :text="$t('dashboards.this-week')"
                size="xs"
                variant="outline-secondary"
                class="float-right float-none-xs mt-2"
              >
                <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
                <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
              </b-dropdown>
            </b-card-body>
            <div class="chart card-body pt-0">
              <area-shadow-chart :data="conversionChartData" :height="195" />
            </div>
          </b-card>
        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx sm="12" md="6" class="mb-4">
          <b-card class="dashboard-filled-line-chart" no-body>
            <b-card-body>
              <div class="float-left float-none-xs">
                <div class="d-inline-block">
                  <h5 class="d-inline">{{ $t('dashboards.website-visits') }}</h5>
                  <span class="text-muted text-small d-block">{{ $t('dashboards.unique-visitors') }}</span>
                </div>
              </div>
              <b-dropdown
                id="ddown5"
                :text="$t('dashboards.this-week')"
                size="xs"
                variant="outline-primary"
                class="float-right float-none-xs mt-2"
              >
                <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
                <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
              </b-dropdown>
            </b-card-body>
            <div class="chart card-body pt-0">
              <area-shadow-chart :data="areaChartData" :height="195" />
            </div>
          </b-card>
        </b-colxx>
        <b-colxx sm="12" md="6" class="mb-4">
          <b-card class="dashboard-filled-line-chart" no-body>
            <b-card-body>
              <div class="float-left float-none-xs">
                <div class="d-inline-block">
                  <h5 class="d-inline">{{ $t('dashboards.conversion-rates') }}</h5>
                  <span class="text-muted text-small d-block">{{ $t('dashboards.per-session') }}</span>
                </div>
              </div>
              <b-dropdown
                id="ddown5"
                :text="$t('dashboards.this-week')"
                size="xs"
                variant="outline-secondary"
                class="float-right float-none-xs mt-2"
              >
                <b-dropdown-item>{{ $t('dashboards.last-week') }}</b-dropdown-item>
                <b-dropdown-item>{{ $t('dashboards.this-month') }}</b-dropdown-item>
              </b-dropdown>
            </b-card-body>
            <div class="chart card-body pt-0">
              <area-shadow-chart :data="conversionChartData" :height="195" />
            </div>
          </b-card>
        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx xxs="12" class="mb-4">
          <b-card :title="$t('dashboards.sales')">
            <div class="dashboard-line-chart">
              <line-shadow-chart :data="lineChartData" :height="285" />
            </div>
          </b-card>
        </b-colxx>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { ResizeObserver } from "vue-resize";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import {
  CalendarView,
  CalendarViewHeader,
  CalendarMathMixin
} from "vue-simple-calendar";

import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationBootstrap from "components/Common/VuetablePaginationBootstrap";

import draggable from "vuedraggable";

import vSelect from "vue-select";

import IconCard from "components/Cards/IconCard";
import GradientCard from "components/Cards/GradientCard";
import GradientWithRadialProgressCard from "components/Cards/GradientWithRadialProgressCard";
import SmallLineChartCard from "components/Cards/SmallLineChartCard";

import RadialProgressCard from "components/Cards/RadialProgressCard";
import LineShadowChart from "components/Charts/LineShadow";
import PolarAreaShadowChart from "components/Charts/PolarAreaShadow";
import AreaShadowChart from "components/Charts/AreaShadow";

import RecentOrderItem from "components/Listing/RecentOrderItem";
import LogList from "components/Listing/LogList";
import ListWithUserItem from "components/Listing/ListWithUserItem";
import TwoColumnList from "components/Listing/TwoColumnList";
import TopRatedSlideItem from "components/Listing/TopRatedSlideItem";

import {
  lineChartData,
  polarAreaChartData,
  areaChartData,
  conversionChartData,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "data/charts";
import logs from "data/logs";
import products from "data/products";
import tickets from "data/tickets";
import profileStatuses from "data/profileStatuses";
import cakes from "data/cakes";
import { apiUrl } from "constants/config";

export default {
  components: {
    IconCard,
    GradientCard,
    swiper,
    swiperSlide,
    ResizeObserver,
    LineShadowChart,
    RecentOrderItem,
    PolarAreaShadowChart,
    AreaShadowChart,
    LogList,
    ListWithUserItem,
    CalendarView,
    CalendarViewHeader,
    Vuetable,
    VuetablePagination,
    VuetablePaginationBootstrap,
    TwoColumnList,
    draggable,
    RadialProgressCard,
    GradientWithRadialProgressCard,
    vSelect,
    SmallLineChartCard,
    TopRatedSlideItem
  },
  mixins: [CalendarMathMixin],
  data() {
    return {
      swiperIconsOption: {
        slidesPerView: 4,
        breakpoints: {
          0: { slidesPerView: 1 },
          320: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          1800: { slidesPerView: 3 }
        }
      },
      lineChartData,
      products,
      polarAreaChartData,
      logs,
      tickets,
      calendar: {
        showDate: this.thisMonth(1),
        events: [
          {
            id: "e2",
            startDate: this.thisMonth(15),
            title: "Meeting",
            classes: "secondary"
          },
          {
            id: "e3",
            startDate: this.thisMonth(8, 9, 25),
            endDate: this.thisMonth(9, 16, 30),
            title: "Sales",
            classes: "primary"
          },
          {
            id: "e5",
            startDate: this.thisMonth(5),
            endDate: this.thisMonth(12),
            title: "Tax Days",
            classes: "secondary"
          },
          {
            id: "e10",
            startDate: this.thisMonth(27),
            title: "My Birthday!"
          }
        ]
      },
      bestsellers: {
        apiUrl: apiUrl + "/cakes/fordatatable",
        fields: [
          {
            name: "title",
            sortField: "title",
            title: "Name",
            titleClass: "",
            dataClass: "list-item-heading"
          },
          {
            name: "sales",
            sortField: "sales",
            title: "Sales",
            titleClass: "",
            dataClass: "text-muted"
          },
          {
            name: "stock",
            sortField: "stock",
            title: "Stock",
            titleClass: "",
            dataClass: "text-muted"
          },
          {
            name: "category",
            sortField: "category",
            title: "Category",
            titleClass: "",
            dataClass: "text-muted"
          }
        ]
      },
      profileStatuses,
      cakes,
      areaChartData,
      conversionChartData,
      selectData: [
        { label: "Chocolate", value: "chocolate" },
        { label: "Vanilla", value: "vanilla" },
        { label: "Strawberry", value: "strawberry" },
        { label: "Caramel", value: "caramel" },
        { label: "Cookies and Cream", value: "cookiescream" },
        { label: "Peppermint", value: "peppermint" }
      ],
      smallChartData1,
      smallChartData2,
      smallChartData3,
      smallChartData4,
      swiperTopRatedOption: {
        slidesPerView: 1,
        breakpoints: {
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          992: { slidesPerView: 2 }
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.handleSwipersResize();
    }, 50);
  },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    },
    handleSwipersResize() {
      this.$refs.swiperIcons.update();
      this.$refs.swiperTopRated.update();
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickDay(d) {
      console.log(`You clicked: ${d.toLocaleDateString()}`);
    },
    onClickEvent(e) {
      console.log(`You clicked: ${e.title}`);
    },
    setShowDate(d) {
      this.calendar.showDate = d;
    },
    onDropDate(event, date) {
      console.log(`You dropped ${event.id} on ${date.toLocaleDateString()}`);

      const eLength = this.dayDiff(event.startDate, date);
      event.originalEvent.startDate = this.addDays(event.startDate, eLength);
      event.originalEvent.endDate = this.addDays(event.endDate, eLength);
    },

    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    }
  }
};
</script>
