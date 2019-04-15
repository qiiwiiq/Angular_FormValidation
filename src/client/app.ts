declare var angular: any;
namespace myAPP {
    angular.module("myApp",['ngMessages']);

    export class myCtrl {
        static $inject = ['$scope'];
        constructor($scope) {

            // 選取日期最小值設定為今天
            $scope.today = new Date();
        
            // 選擇指定日期 預設不顯示
            $scope.selectDate = false;

            // disable submit btn 預設不disable
            $scope.disableBtn = false;
            
            // 顯式資料區塊 預設不顯示
            $scope.displayData = false;
            
            // error message 預設不顯示
            $scope.inputName = false;
            $scope.inputPhone = false;
            $scope.inputAddr = false;
            $scope.inputPatch = false;
            $scope.inputDate = false;
            $scope.inputNote = false;

            // 若選'指定到貨日'，顯示選擇日期區塊
            $scope.$watch('model', () => {
                if($scope.hasOwnProperty('model')) {
                    if($scope.model.patch == '指定到貨日'){
                        $scope.selectDate = true;
                    } else {
                        $scope.selectDate = false;
                        $scope.model.date = '';
                    }
                }
            }, true);

            // 按 Submit 按鈕
            $scope.submit = () => {
                // 如果表單驗證失敗
                if($scope.myForm.$invalid){
                    // disable submit btn
                    $scope.disableBtn = true;

                    // 監看表單內容
                    $scope.$watch('model', () => {
                        if($scope.myForm.name.$invalid){
                            $scope.inputName = true;
                            $scope.inputPhone = false;
                            $scope.inputAddr = false;
                            $scope.inputPatch = false;
                            $scope.inputDate = false;
                            $scope.inputNote = false;

                        } else if ($scope.myForm.phone.$invalid){
                            $scope.inputPhone = true;
                            $scope.inputName = false;
                            $scope.inputAddr = false;
                            $scope.inputPatch = false;
                            $scope.inputDate = false;
                            $scope.inputNote = false;

                        } else if ($scope.myForm.address.$invalid){
                            $scope.inputAddr = true;
                            $scope.inputName = false;
                            $scope.inputPhone = false;
                            $scope.inputPatch = false;
                            $scope.inputDate = false;
                            $scope.inputNote = false;

                        } else if ($scope.model.patch == undefined){
                            $scope.inputPatch = true;
                            $scope.inputName = false;
                            $scope.inputPhone = false;
                            $scope.inputAddr = false;
                            $scope.inputDate = false;
                            $scope.inputNote = false;

                            if ($scope.model.patch == "指定到貨日"){
                                $scope.selectDate = true;
                            } else {
                                $scope.selectDate = false;
                                $scope.model.date = '';
                            }
                        } else if ($scope.model.date === undefined){
                            $scope.inputDate = true;
                            $scope.disableBtn = false;
                            $scope.inputName = false;
                            $scope.inputPhone = false;
                            $scope.inputAddr = false;
                            $scope.inputPatch = false;
                            $scope.inputNote = false;

                        } else if ($scope.myForm.note.$invalid){
                            $scope.inputNote = true;
                            $scope.inputName = false;
                            $scope.inputPhone = false;
                            $scope.inputAddr = false;
                            $scope.inputPatch = false;
                            $scope.inputDate = false;
                        } 

                        // 表單驗證成功，取消 diable btn
                        if($scope.myForm.$valid){
                            $scope.disableBtn = false;
                            $scope.inputName = false;
                            $scope.inputPhone = false;
                            $scope.inputAddr = false;
                            $scope.inputPatch = false;
                            $scope.inputDate = false;
                            $scope.inputNote = false;
                        }
                    }, true);

                // 如果表單驗證成功，顯示資料區塊
                } else {
                    // 顯示資料
                    $scope.displayData = true;
                }
            };
        }
    }

    angular.module("myApp").controller("myCtrl", myCtrl);
}
