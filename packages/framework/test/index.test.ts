import { AutoWired, BaseModel, BaseModule, Injectable, Model, Module } from '../src';

describe('simple demo', () => {
  it('test result', () => {
    @Injectable('test')
    class TestService {
      public calc(a: number, b: number) {
        return a + b;
      }
    }
    class TestModel extends BaseModel {
      @AutoWired()
      private service!: TestService;

      public a = 1;

      public calc(b: number) {
        return this.service.calc(this.a, b);
      }
    }
    @Module({
      providers: [TestService],
    })
    class TestModule extends BaseModule {}

    const testModel = TestModule.createModel(new TestModel());

    expect(testModel.a).toBe(1);
    expect(testModel.calc(1)).toBe(2);
  });

  it('test result with service interface', () => {
    abstract class ITestService {
      public abstract calc(a: number, b: number): number;
    }
    @Injectable('test')
    class TestService extends ITestService {
      public calc(a: number, b: number) {
        return a + b;
      }
    }
    class TestModel extends BaseModel {
      @AutoWired()
      private service!: ITestService;

      public a = 1;

      public calc(b: number) {
        return this.service.calc(this.a, b);
      }
    }
    @Module({
      providers: [TestService],
    })
    class TestModule extends BaseModule {}

    const testModel = TestModule.createModel(new TestModel());

    expect(testModel.a).toBe(1);
    expect(testModel.calc(1)).toBe(2);
  });
});
