/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var BeakerPageObject = require('../../beaker.po.js');
var beakerPO;

describe('Native Plotting in Python', function () {

    beforeAll(function(done){
        beakerPO = new BeakerPageObject();
        browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:config%2Ftutorials%2FpythonChartingAPI.bkr&readOnly=true").then(done);
        beakerPO.waitUntilLoadingFinished()();
    });

    afterAll(function(done){
        beakerPO.createScreenshot('pythonPlotTutorial');
        done();
    });

    it('Plot with simple properties', function () {
        var idCell = "codeEOwhXw";
        beakerPO.scrollToBkCellByIdCell(idCell);
        beakerPO.clickCodeCellInputButtonByIdCell(idCell, 'Plot');
        beakerPO.checkPlotIsPresentByIdCell(idCell);

        expect(beakerPO.getCodeCellOutputContainerTitleByIdCell(idCell)).toBe("Title");
        expect(beakerPO.getCodeCellOutputContainerYLabelByIdCell(idCell)).toBe("Vertical");
        expect(beakerPO.getCodeCellOutputContainerXLabelByIdCell(idCell)).toBe("Horizontal");
    });
    it('Save plot as SVG/PNG', function() {
        beakerPO.checkSaveAsSvgPngByIdCell("codeEOwhXw", "Title");
    })

});