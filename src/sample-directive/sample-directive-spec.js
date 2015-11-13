(function(){
    //test suit
    describe('sample directive test',function(){
        //test case
        it('2 always equals to 2',function(done){
            var i = 2;
            //test assertion
            expect(i).toBe(2);
            done();

        });
    })
})();