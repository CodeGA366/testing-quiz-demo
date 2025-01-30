declare namespace Cypress {
    interface Chainable {
        intercept(
            method:string,
            url:string,
            response:any,
            options?: Partial<InterceptOptions>
        ): Chainable;
    }
}