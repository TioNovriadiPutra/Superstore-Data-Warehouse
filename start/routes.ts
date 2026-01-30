/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/kpi', '#controllers/analytics_controller.getKPI')
router.get('/trend', '#controllers/analytics_controller.getTrend')
router.get('/category', '#controllers/analytics_controller.getSalesByCategory')
router.get('/region', '#controllers/analytics_controller.getSalesByRegion')
router.get('/profit', '#controllers/analytics_controller.getProfitScatter')
router.get('/sub-category', '#controllers/analytics_controller.getSalesBySubCategory')
router.get('/segment', '#controllers/analytics_controller.getSalesBySegment')
router.get('/performance', '#controllers/analytics_controller.getProductPerformance')
