import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import LocationClient from "../views/LocationClient.vue";
import Surveys from "../views/Surveys.vue";
import SurveyView from "../views/SurveyView.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Outbound from "../views/Outbound.vue";
import AsnList from "../views/AsnList.vue";
import Receiving from "../views/Receiving.vue";
import AsnScan from "../views/AsnScan.vue";
import AsnDetail from "../views/AsnDetail.vue";
import OpenAsn from "../views/OpenAsn.vue";
import PutAway from "../views/PutAway.vue";
import ReceivingDocuments from "../views/ReceivingDocuments.vue";
import InwardDocuments from "../views/InwardDocuments.vue";
import InwardReceiving from "../views/InwardReceiving.vue";
import OutboundSearch from "../views/OutboundSearch.vue";
import OutboundDocuments from "../views/OutboundDocuments.vue";
import VehicleOutDocuments from "../views/VehicleOutDocuments.vue";
import VehicleOut from "../views/VehicleOut.vue";
//import PutAwayBox from '../views/PutAwayBox.vue';
import PutAwayDetail from "../views/putAwayDetail.vue";
import PickList from "../views/PickList.vue";
import AisleList from "../views/AisleList.vue";
import RackList from "../views/RackList.vue";
import SkuList from "../views/SkuList.vue";
import rfidOperation from "../views/RFIDOperation.vue";
import PickListDetails from "../views/PickListDetails.vue";
//import PickList from '../views/PickList.vue';
//import BoxPickList from '../views/BoxPickList.vue';
//import SkuWeightUpdations from '../views/SkuWeightUpdations.vue';
import Inventory from "../views/Inventory.vue";
//import AsnDetial from '../views/AsnDetial.vue'
import Employee from "../views/Employee.vue";
import Inbound from "../views/Inbound.vue";
import vueSelfie from "../views/VueSelfie.vue";
import VehicleImage from "../views/VehicleImage.vue";
import BinToBinTransfer from "../views/inventory/BinToBinTransfer.vue";
import BinToLocationTransfer from "../views/inventory/BinToLocationTransfer.vue";
import PageNotFound from "../views/PageNotFound.vue";
//
import qr from "../views/qr.vue";
import setting from "../views/setting.vue";
//
import AppAiles from "../views/AppAiles.vue";
import AppRack from "../views/AppRack.vue";
import AppRackLocation from "../views/AppRackLocation.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/dashboard", name: "Dashboard", component: Dashboard },
      {
        path: "/LocationClient",
        name: "LocationClient",
        component: LocationClient,
      },

      { path: "/surveys", name: "Survey", component: Surveys },
      { path: "/survey/create", name: "SurveyCreate", component: SurveyView },
      { path: "/survey/:id", name: "SurveyView", component: SurveyView },
      { path: "/inbound", name: "Inbound", component: Inbound },
      { path: "/outbound", name: "outbound", component: Outbound },
      { path: "/asn-scan", name: "AsnScan", component: AsnScan },
      { path: "/asn-list", name: "AsnList", component: AsnList },
      { path: "/asn-detail/:id", name: "AsnDetails", component: AsnDetail },
      {
        path: "/asn-inward-receiving",
        name: "InwardReceiving",
        component: InwardReceiving,
      },
      {
        path: "inward-documents/:id",
        name: "InwardDocuments",
        component: InwardDocuments,
      },

      // pick list url
      { path: "/pick-list", name: "PickList", component: PickList },
      {
        path: "/pick-list-detail/:dnno/:inv/:tq/:ts",
        name: "PickListDetails",
        component: PickListDetails,
      },
      // pick list url

      // zone list

      // { path: '/', name: 'zoneList', component: ZoneList },
      { name: "aisle-list", path: "/aisle-list/:id", component: AisleList },

      {
        name: "aisle-list-new",
        path: "/aisle-list-new/:id",
        component: AisleList,
      },
      { name: "rack-list", path: "/rack-list/:id", component: RackList },
      { name: "sku-list", path: "/sku-list/:id", component: SkuList },

      // zone list End

      { path: "/receiving", name: "Receiving", component: Receiving },
      {
        path: "/receivingdocuments/:id",
        name: "ReceivingDocuments",
        component: ReceivingDocuments,
      },
      { path: "/open-asn", name: "OpenAsn", component: OpenAsn },
      { path: "/put-away", name: "PutAway", component: PutAway },
      {
        path: "/put-away-detail/:id",
        name: "PutAwayDetail",
        component: PutAwayDetail,
      },
      //{ path: '/dispatch', name: 'Dispatch', component: Dispatch },

      //{ path: '/box-pick-list', name: 'BoxPickList', component: BoxPickList },
      // { path: '/sku-weight-updations', name: 'SkuWeightUpdations', component: SkuWeightUpdations },
      { path: "/inventory", name: "Inventory", component: Inventory },
      { path: "/employee", name: "Employee", component: Employee },
      { path: "vue-selfie", name: "vueSelfie", component: vueSelfie },
      { path: "vehicle-image", name: "VehicleImage", component: VehicleImage },

      //
      { path: "/qr", name: "qr", component: qr },
      { path: "/setting", name: "setting", component: setting },
      //### OUTBOUND URL ##
      {
        path: "/asn-outbound",
        name: "OutboundSearch",
        component: OutboundSearch,
      },
      {
        path: "outward-documents/:id/:inv",
        name: "OutboundDocuments",
        component: OutboundDocuments,
      },
      {
        path: "vehicle-out-uploads/:id",
        name: "VehicleOutDocuments",
        component: VehicleOutDocuments,
      },
      { path: "vehicleout", name: "VehicleOut", component: VehicleOut },
      // { path: '/asn-detail/:id', name: 'AsnDetial', component: AsnDetial },
      {
        path: "/bin-to-bin-transfer",
        name: "BinToBinTransfer",
        component: BinToBinTransfer,
      },
      {
        path: "/bin-to-location-transfer",
        name: "BinToLocationTransfer",
        component: BinToLocationTransfer,
      },
      {
        path: "/rfid-operation",
        name: "rfidOperation",
        component: rfidOperation,
      },

      {
        path: "/:pathMatch(.*)*",
        name: "PageNotFounds",
        component: PageNotFound,
      },

      {
        path: "/ailes-lists/:dnno/:inv/:tq/:ts/:zone",
        name: "AppAiles",
        component: AppAiles,
      },

      {
        path: "/rack-lists/:dnno/:inv/:tq/:ts/:zone/:rack/:warehouseId/:clientId",
        name: "AppRack",
        component: AppRack,
      },

      {
        path: "/rack-lists-data/:dnno/:inv/:tq/:ts/:zone/:rack/:locationid",
        name: "AppRackLocation",
        component: AppRackLocation,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: Login,
        component: Login,
      },
      {
        path: "/register",
        name: Register,
        component: Register,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ path: "/login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ path: "/dashboard" });
  } else {
    next();
  }
});

export default router;
