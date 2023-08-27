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

  it('test result when have 2 services', () => {
    abstract class ITestService {
      public abstract calc(a: number, b: number): number;
    }
    @Injectable('test1')
    class TestService1 extends ITestService {
      public calc(a: number, b: number) {
        return a + b;
      }
    }
    @Injectable('test2')
    class TestService2 extends ITestService {
      public calc(a: number, b: number) {
        return 9;
      }
    }
    class TestModel extends BaseModel {
      @AutoWired('test1')
      private service1!: ITestService;

      @AutoWired('test2')
      private service2!: ITestService;

      public a = 1;

      public calc1(b: number) {
        return this.service1.calc(this.a, b);
      }

      public calc2() {
        return this.service2.calc(this.a, 1);
      }
    }
    @Module({
      providers: [TestService1, TestService2],
    })
    class TestModule extends BaseModule {}

    const testModel = TestModule.createModel(new TestModel());

    expect(testModel.a).toBe(1);
    expect(testModel.calc1(1)).toBe(2);
    expect(testModel.calc2()).toBe(9);
  });
});
